import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/constants';

interface UseFileUploadOptions {
  acceptedTypes?: string[];
  maxSize?: number;
  onUploadSuccess?: (result: any) => void;
  onUploadError?: (error: string) => void;
}

interface UseFileUploadReturn {
  file: File | null;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  selectFile: (file: File) => boolean;
  uploadFile: (endpoint: string, additionalData?: Record<string, any>) => Promise<any>;
  resetFile: () => void;
  previewUrl: string | null;
}

export function useFileUpload(options: UseFileUploadOptions = {}): UseFileUploadReturn {
  const {
    acceptedTypes = SUPPORTED_FILE_TYPES,
    maxSize = MAX_FILE_SIZE,
    onUploadSuccess,
    onUploadError,
  } = options;

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { toast } = useToast();

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(', ')}`;
    }

    return null;
  }, [acceptedTypes, maxSize]);

  const selectFile = useCallback((selectedFile: File): boolean => {
    const validationError = validateFile(selectedFile);
    
    if (validationError) {
      setError(validationError);
      toast({
        title: "File Error",
        description: validationError,
        variant: "destructive",
      });
      return false;
    }

    setFile(selectedFile);
    setError(null);
    setUploadProgress(0);

    // Create preview URL for images
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    return true;
  }, [validateFile, toast]);

  const uploadFile = useCallback(async (
    endpoint: string, 
    additionalData: Record<string, any> = {}
  ): Promise<any> => {
    if (!file) {
      throw new Error('No file selected');
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Add additional data to form
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      
      setUploadProgress(100);
      onUploadSuccess?.(result);
      
      toast({
        title: "Upload Successful",
        description: "Your file has been uploaded and processed.",
      });

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      onUploadError?.(errorMessage);
      
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [file, onUploadSuccess, onUploadError, toast]);

  const resetFile = useCallback(() => {
    setFile(null);
    setError(null);
    setUploadProgress(0);
    setIsUploading(false);
    
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  return {
    file,
    isUploading,
    uploadProgress,
    error,
    selectFile,
    uploadFile,
    resetFile,
    previewUrl,
  };
}
