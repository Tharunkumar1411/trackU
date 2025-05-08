import { create } from 'zustand';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';

interface User {
  email: string | null;
  uid: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({
        user: {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        },
        isLoading: false,
      });
    } catch (error) {
      let errorMessage = 'Failed to sign in. Please try again.';
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Invalid email or password';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Too many failed attempts. Please try again later.';
        }
      }
      set({ error: errorMessage, isLoading: false });
    }
  },

  signup: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({
        user: {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        },
        isLoading: false,
      });
    } catch (error) {
      let errorMessage = 'Failed to create account. Please try again.';
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email is already in use';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak';
        }
      }
      set({ error: errorMessage, isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOut(auth);
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to sign out', isLoading: false });
    }
  },

  setError: (error: string | null) => set({ error }),
})); 