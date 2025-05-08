type Environment = 'preview' | 'local' | 'production';

export const VITE_ENV: Environment = (import.meta.env.VITE_ENV ??
  'production') as Environment;

