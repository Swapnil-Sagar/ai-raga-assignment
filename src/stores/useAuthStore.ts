import {
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
  isLoading: boolean
  authError: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOutUser: () => Promise<void>
  setAuthUser: (user: User | null) => void
  clearAuthError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  authError: null,
  signIn: async (email, password) => {
    set({ isLoading: true, authError: null })
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
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
    useAuthStore.setState({ isLoading: false })
  })
}
