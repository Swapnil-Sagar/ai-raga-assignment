import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuthStore } from '../stores/useAuthStore'

export const LoginPage = () => {
  const { signIn, isLoading, authError, clearAuthError } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    clearAuthError()
    setValidationError(null)

    if (!email || !password) {
      setValidationError('Email and password are required.')
      return
    }

    try {
      await signIn(email, password)
    } catch {
      // Auth error state is handled by the store.
    }
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <h1>Healthcare Command Center</h1>
        <p>Securely sign in to access analytics and patient modules.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@hospital.com"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
          {(validationError || authError) ? (
            <p className="form-error">{validationError ?? authError}</p>
          ) : null}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </section>
    </div>
  )
}
