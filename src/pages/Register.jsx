import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export default function Register({ onDemoLogin }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setFormError('');

    if (Object.keys(validationErrors).length > 0) {
      setFormError('Please fix the validation errors below.');
      return;
    }

    onDemoLogin({
      name: fullName.trim(),
      email: email.trim(),
      isDemo: true,
    });
    navigate('/hotels');
  };

  return (
    <section className="se-auth-page">
      <div className="se-container">
        <div className="se-auth-card">
          <div className="se-auth-visual">
            <img
              src="/src/assets/images/hotel_marrakech_riad_1795356327345.jpg"
              alt="Dar Zellige courtyard riad in Marrakech"
              referrerPolicy="no-referrer"
            />
            <div className="se-auth-visual-scrim">
              <h2 className="se-auth-visual-title">Create your guest profile</h2>
              <p className="se-auth-visual-copy">
                Prepare sample itineraries across our boutique stays in Italy, Japan, Morocco, and
                Switzerland.
              </p>
            </div>
          </div>

          <div className="se-auth-form-panel">
            <h1 className="se-auth-title">Create account</h1>
            <p className="se-auth-subtitle">
              Set up a demonstration profile for faster stay booking previews.
            </p>

            <div className="se-demo-notice">
              <strong>Demo registration only:</strong> No production account is created and no real
              passwords are stored in localStorage or external services.
            </div>

            <form className="se-auth-form" onSubmit={handleSubmit} noValidate>
              {formError && (
                <div className="se-form-alert" role="alert">
                  <AlertCircle size={17} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="se-field-group">
                <label htmlFor="reg-name" className="se-field-label">
                  Full name
                </label>
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  className="se-field-input"
                  placeholder="Camille Laurent"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errors.fullName && (
                  <p className="se-field-error" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="se-field-group">
                <label htmlFor="reg-email" className="se-field-label">
                  Email address
                </label>
                <input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  className="se-field-input"
                  placeholder="camille@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="se-field-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="se-field-group">
                <label htmlFor="reg-password" className="se-field-label">
                  Password
                </label>
                <div className="se-password-wrap">
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className="se-field-input se-password-input"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={Boolean(errors.password)}
                  />
                  <button
                    type="button"
                    className="se-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="se-field-error" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="se-field-group">
                <label htmlFor="reg-confirm" className="se-field-label">
                  Confirm password
                </label>
                <div className="se-password-wrap">
                  <input
                    id="reg-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    className="se-field-input se-password-input"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    aria-invalid={Boolean(errors.confirmPassword)}
                  />
                  <button
                    type="button"
                    className="se-password-toggle"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="se-field-error" role="alert">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button type="submit" className="se-btn se-btn-accent" style={{ marginTop: '6px' }}>
                Create Demo Account
              </button>
            </form>

            <p className="se-auth-switch">
              Already have a demo profile? <Link to="/login">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
