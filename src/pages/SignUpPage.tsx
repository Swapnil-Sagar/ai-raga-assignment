import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { useAuthStore } from '../stores/useAuthStore'

export const SignUpPage = () => {
  const { signUp, isLoading, authError, clearAuthError } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const displayError = validationError ?? authError

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    clearAuthError()
    setValidationError(null)

    const normalizedEmail = email.trim()

    if (!normalizedEmail || !password || !confirmPassword) {
      setValidationError('All fields are required.')
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setValidationError('Enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters.')
      return
    }

    if (!/[A-Z]/.test(password)) {
      setValidationError('Password must contain at least one uppercase letter.')
      return
    }

    if (!/[0-9]/.test(password)) {
      setValidationError('Password must contain at least one number.')
      return
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.')
      return
    }

    try {
      await signUp(normalizedEmail, password)
    } catch {
      // Auth error state is handled by the store.
    }
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <h1>Create Account</h1>
        <p>Join the Healthcare Command Center platform.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@hospital.com"
            aria-invalid={Boolean(displayError)}
          />

          <label htmlFor="signup-password">Password</label>
          <div className="password-field">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 chars, 1 uppercase, 1 number"
              aria-invalid={Boolean(displayError)}
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

          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <div className="password-field">
            <input
              id="signup-confirm-password"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              aria-invalid={Boolean(displayError)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {displayError ? (
            <p className="form-error" role="alert">
              {displayError}
            </p>
          ) : null}

          <div className="password-hints">
            <span className={password.length >= 6 ? 'hint--pass' : ''}>6+ chars</span>
            <span className={/[A-Z]/.test(password) ? 'hint--pass' : ''}>Uppercase</span>
            <span className={/[0-9]/.test(password) ? 'hint--pass' : ''}>Number</span>
            <span className={password.length > 0 && password === confirmPassword ? 'hint--pass' : ''}>Match</span>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
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
