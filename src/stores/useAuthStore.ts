import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { create } from 'zustand'
import { auth } from '../services/firebase'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isSessionReady: boolean
  isLoading: boolean
  authError: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOutUser: () => Promise<void>
  setAuthUser: (user: User | null) => void
  clearAuthError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isSessionReady: false,
  isLoading: false,
  authError: null,
  signIn: async (email, password) => {
    set({ isLoading: true, authError: null })
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      const message = mapAuthErrorMessage(error)
      set({ authError: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },
  signUp: async (email, password) => {
    set({ isLoading: true, authError: null })
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      const message = mapAuthErrorMessage(error)
      set({ authError: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },
  signOutUser: async () => {
    set({ isLoading: true })
    try {
      await signOut(auth)
    } finally {
      set({ isLoading: false })
    }
  },
  setAuthUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
  clearAuthError: () => set({ authError: null }),
}))

let hasBootstrapped = false

export const bootstrapAuthSession = () => {
  if (hasBootstrapped) {
    return
  }

  hasBootstrapped = true
  useAuthStore.setState({ isLoading: true })

  onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setAuthUser(user)
    useAuthStore.setState({ isLoading: false, isSessionReady: true })
  })
}

const mapAuthErrorMessage = (error: unknown) => {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return 'Unable to sign in right now. Please try again.'
  }

  const authCode = String(error.code)

  switch (authCode) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid credentials. Please check your email and password.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.'
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a minute and try again.'
    case 'auth/network-request-failed':
      return 'Network issue detected. Check your connection and retry.'
    default:
      return 'Something went wrong. Please try again.'
  }
}
