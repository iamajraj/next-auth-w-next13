// nextauth.d.ts

declare module 'next-auth' {
  interface User {
    id?: string;
  }
  interface Session extends DefaultSession {
    user?: User;
  }
}

export {};
