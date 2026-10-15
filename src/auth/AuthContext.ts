import { createContext, useContext } from 'react';
import { type SessionUser } from './session';

export interface Auth {
  ready: boolean;
  signingOut: boolean;
  user: SessionUser | null;
  signIn: (returnTo?: string) => Promise<void>;
  signUp: () => Promise<void>;
  signOut: () => Promise<void>;
  completeSignIn: () => Promise<string>;
  getAccessToken: () => Promise<string>;
}

export const AuthContext = createContext<Auth | null>(null);

export function useAuth(): Auth {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return auth;
}
