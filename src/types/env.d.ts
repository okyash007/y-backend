declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      MONGODB_URI: string;
      // Add other environment variables as needed
      // JWT_SECRET?: string;
      // API_KEY?: string;
    }
  }
}

export {};
