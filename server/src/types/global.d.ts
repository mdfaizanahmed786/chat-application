export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIREBASE_API_KEY: string;
      FIREBASE_APP_ID: string;
      FIREBASE_AUTH_DOMAIN: string;
      FIREBASE_PROJECT_ID: string;
      JWT_SECRET: string;
      MONGO_URI: string;
      PUSHER_API_KEY: string;
      PUSHER_SECRET: string;
    }
  }
}
