import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { useAuthStore } from '../stores/useAuthStore'

export const LoginPage = () => {
  const { signIn, isLoading, authError, clearAuthError } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const loginError = validationError ?? authError

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    clearAuthError()
    setValidationError(null)

    const normalizedEmail = email.trim()

    if (!normalizedEmail || !password) {
      setValidationError('Email and password are required.')
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setValidationError('Enter a valid email format.')
      return
    }

    try {
      await signIn(normalizedEmail, password)
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
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@hospital.com"
            aria-invalid={Boolean(loginError)}
          />
          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              aria-invalid={Boolean(loginError)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {loginError ? (
            <p className="form-error" role="alert">
              {loginError}
            </p>
          ) : null}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
          <button
            type="button"
            className="btn-test-login"
            disabled={isLoading}
            onClick={() => {
              setEmail('test@hospital.com')
              setPassword('ragahospital')
              clearAuthError()
              setValidationError(null)
            }}
          >
            Fill Test Credentials
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>

        <footer className="auth-footer">
          Made by Swapnil Sagar
          <a
            href="https://github.com/Swapnil-Sagar/ai-raga-assignment"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <FaGithub size={18} />
          </a>
        </footer>
      </section>
    </div>
  )
}
