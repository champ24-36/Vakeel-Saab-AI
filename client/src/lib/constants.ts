export const INDIAN_LANGUAGES = [
  { code: 'english', name: 'English', nativeName: 'English' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bengali', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'marathi', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'odia', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'assamese', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'urdu', name: 'Urdu', nativeName: 'اردو' },
  { code: 'sanskrit', name: 'Sanskrit', nativeName: 'संस्कृत' },
  { code: 'nepali', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'manipuri', name: 'Manipuri', nativeName: 'মৈতৈলোন্' },
  { code: 'bodo', name: 'Bodo', nativeName: 'बोडो' },
  { code: 'santhali', name: 'Santhali', nativeName: 'संथाली' },
  { code: 'maithili', name: 'Maithili', nativeName: 'मैथिली' },
  { code: 'dogri', name: 'Dogri', nativeName: 'डोगरी' },
  { code: 'kashmiri', name: 'Kashmiri', nativeName: 'کٲشُر' },
  { code: 'konkani', name: 'Konkani', nativeName: 'कोंकणी' },
];

export const LEGAL_SPECIALIZATIONS = [
  'All Areas',
  'Corporate Law',
  'Criminal Law',
  'Family Law',
  'Property Law',
  'Tax Law',
  'Labour Law',
  'Constitutional Law',
  'Intellectual Property',
  'Environmental Law',
  'Banking Law',
  'Insurance Law',
  'Consumer Protection',
  'Cyber Law',
  'Immigration Law',
];

export const EXPERIENCE_RANGES = [
  'Any Experience',
  '0-5 years',
  '5-10 years',
  '10+ years',
];

export const MESSAGE_TYPES = {
  TEXT: 'text',
  VOICE: 'voice',
  FILE: 'file',
} as const;

export const SUPPORTED_FILE_TYPES = [
  '.pdf',
  '.doc',
  '.docx',
  '.txt',
  '.rtf',
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const CHAT_LIMITS = {
  MAX_MESSAGE_LENGTH: 5000,
  MAX_HISTORY_ITEMS: 100,
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
  },
  CHAT: {
    MESSAGE: '/api/chat/message',
    VOICE: '/api/chat/voice',
    FILE: '/api/chat/file',
    HISTORY: '/api/chat/history',
  },
  LAWYERS: {
    LIST: '/api/lawyers',
    DETAIL: '/api/lawyers',
    SEARCH: '/api/lawyers',
  },
  BLOG: {
    LIST: '/api/blog',
    DETAIL: '/api/blog',
    FEATURED: '/api/blog?featured=true',
  },
  CONTACT: '/api/contact',
} as const;
