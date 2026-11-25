export const endpoints = {
  diagnosis: import.meta.env.VITE_PREDICT_PATH?.trim() || '/predict',
} as const;
