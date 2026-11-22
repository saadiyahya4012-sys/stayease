import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ demoUser, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionNav = (sectionId) => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(`/#${sectionId}`);
  };

  return (
    <header className="se-header">
      <div className="se-container se-header-inner">
        <Link to="/" className="se-brand" onClick={() => setMobileOpen(false)}>
          StayEase
        </Link>

        <nav className="se-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `se-nav-link ${isActive && !location.hash ? 'is-active' : ''}`
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/hotels"
            className={({ isActive }) => `se-nav-link ${isActive ? 'is-active' : ''}`}
          >
            Hôtels
          </NavLink>
          <button
            type="button"
            className={`se-nav-link bg-transparent border-0 cursor-pointer ${
              location.hash === '#destinations' ? 'is-active' : ''
            }`}
            onClick={() => handleSectionNav('destinations')}
          >
            Destinations
          </button>
          <button
            type="button"
            className={`se-nav-link bg-transparent border-0 cursor-pointer ${
              location.hash === '#about' ? 'is-active' : ''
            }`}
            onClick={() => handleSectionNav('about')}
          >
            À propos
          </button>
          <button
            type="button"
            className={`se-nav-link bg-transparent border-0 cursor-pointer ${
              location.hash === '#contact' ? 'is-active' : ''
            }`}
            onClick={() => handleSectionNav('contact')}
          >
            Contact
          </button>
        </nav>

        <div className="se-header-actions">
          {demoUser ? (
            <div className="se-user-session">
              <span className="se-user-name">{demoUser.name}</span>
              <button
                type="button"
                className="se-btn se-btn-outline"
                onClick={onLogout}
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Link to="/login" className="se-btn se-btn-primary hidden md:inline-flex">
              Se connecter
            </Link>
          )}

          <button
            type="button"
            className="se-mobile-toggle"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="se-mobile-drawer">
          <Link to="/" className="se-mobile-link" onClick={() => setMobileOpen(false)}>
            Accueil
          </Link>
          <Link
            to="/hotels"
            className="se-mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            Hôtels
          </Link>
          <button
            type="button"
            className="se-mobile-link bg-transparent border-0 text-left cursor-pointer"
            onClick={() => handleSectionNav('destinations')}
          >
            Destinations
          </button>
          <button
            type="button"
            className="se-mobile-link bg-transparent border-0 text-left cursor-pointer"
            onClick={() => handleSectionNav('about')}
          >
            À propos
          </button>
          <button
            type="button"
            className="se-mobile-link bg-transparent border-0 text-left cursor-pointer"
            onClick={() => handleSectionNav('contact')}
          >
            Contact
          </button>
          <div className="se-mobile-action">
            {demoUser ? (
              <button
                type="button"
                className="se-btn se-btn-outline w-full"
                onClick={() => {
                  setMobileOpen(false);
                  onLogout();
                }}
              >
                Déconnexion ({demoUser.name})
              </button>
            ) : (
              <Link
                to="/login"
                className="se-btn se-btn-primary w-full"
                onClick={() => setMobileOpen(false)}
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
