import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="se-footer">
      <div className="se-container">
        <div className="se-footer-grid">
          <div>
            <p className="se-footer-brand">StayEase</p>
            <p className="se-footer-lead">
              Curated boutique hotels, coastal palazzos, and tranquil sanctuaries chosen for
              architectural character and genuine hospitality.
            </p>
          </div>

          <div>
            <h3 className="se-footer-heading">Navigation</h3>
            <ul className="se-footer-links">
              <li>
                <Link to="/" className="se-footer-link">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="se-footer-link">
                  Hôtels
                </Link>
              </li>
              <li>
                <Link to="/#destinations" className="se-footer-link">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/#about" className="se-footer-link">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="se-footer-heading">Guest Access</h3>
            <ul className="se-footer-links">
              <li>
                <Link to="/login" className="se-footer-link">
                  Se connecter
                </Link>
              </li>
              <li>
                <Link to="/register" className="se-footer-link">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="se-footer-link">
                  Explore Collection
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="se-footer-heading">Concierge</h3>
            <div className="se-footer-contact-item">
              <Mail size={16} aria-hidden="true" />
              <span>concierge@stayease.example</span>
            </div>
            <div className="se-footer-contact-item">
              <Phone size={16} aria-hidden="true" />
              <span className="tabular-nums">+33 1 42 68 55 00</span>
            </div>
            <div className="se-footer-contact-item">
              <MapPin size={16} aria-hidden="true" />
              <span>24 Place Vendôme, Paris</span>
            </div>
          </div>
        </div>

        <div className="se-footer-bottom">
          <span>© {new Date().getFullYear()} StayEase Hospitality. All rights reserved.</span>
          <span>Demo booking showcase — no live payments or reservations processed.</span>
        </div>
      </div>
    </footer>
  );
}
