import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "your-openai-key"
});

export interface ChatRequest {
  message: string;
  language: string;
  messageType: 'text' | 'voice' | 'file';
  fileContent?: string;
  userId?: number;
}

export interface ChatResponse {
  response: string;
  language: string;
  responseType: 'text' | 'error';
}

export async function generateLegalResponse(request: ChatRequest): Promise<ChatResponse> {
  try {
    const { message, language, messageType, fileContent } = request;
    
    // Build system prompt based on language and Indian legal context
    const systemPrompt = `You are an AI legal assistant specialized in Indian law. You provide accurate, helpful legal guidance while always emphasizing that this is general information and not a substitute for professional legal advice.

    Key guidelines:
    - Focus on Indian legal system, constitution, and statutes
    - Provide practical, actionable advice when possible
    - Always include appropriate disclaimers about seeking professional legal counsel
    - Be empathetic and understanding of legal concerns
    - If asked about specific cases, refer to relevant Indian legal precedents
    - Respond in ${language === 'english' ? 'English' : language} language
    - Keep responses clear, professional, and accessible to non-lawyers
    - If handling file content, analyze it in the legal context and provide relevant insights`;

    let userContent = message;
    
    // Handle different message types
    if (messageType === 'file' && fileContent) {
      userContent = `I have uploaded a document for legal review. Please analyze this document and provide legal insights:

Document content: ${fileContent}

User question: ${message}`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userContent
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try rephrasing your question.";

    return {
      response,
      language,
      responseType: 'text'
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    return {
      response: "I apologize, but I'm experiencing technical difficulties. Please try again later or contact our support team for assistance.",
      language: request.language,
      responseType: 'error'
    };
  }
}

export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  try {
    // Create a temporary file-like object for OpenAI API
    const audioFile = new File([audioBuffer], "audio.wav", { type: "audio/wav" });
    
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });

    return transcription.text;
  } catch (error) {
    console.error('Audio transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
}

export async function analyzeLegalDocument(documentContent: string, documentType: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a legal document analysis expert specializing in Indian law. Analyze the provided document and provide insights on:
          - Legal validity and compliance
          - Key terms and conditions
          - Potential risks or issues
          - Recommendations for improvement
          - Relevant Indian legal provisions that apply`
        },
        {
          role: "user",
          content: `Please analyze this ${documentType} document:

${documentContent}`
        }
      ],
      max_tokens: 1500,
      temperature: 0.3,
    });

    return completion.choices[0].message.content || "Unable to analyze the document. Please ensure the content is clear and try again.";
  } catch (error) {
    console.error('Document analysis error:', error);
    throw new Error('Failed to analyze document');
  }
}
