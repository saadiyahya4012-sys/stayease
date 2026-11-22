import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, MapPin } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import HotelCard from '../components/HotelCard.jsx';
import { HERO_IMAGE, hotels, popularDestinations, testimonials } from '../data/hotels.js';
import './Home.css';

export default function Home() {
  const location = useLocation();
  const featuredHotels = hotels.filter((hotel) => hotel.featured).slice(0, 3);

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState({ type: '', text: '' });

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      }
    }
  }, [location.hash]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactForm.name.trim() || contactForm.name.trim().length < 2) {
      setContactStatus({ type: 'error', text: 'Please enter your name.' });
      return;
    }
    if (!emailPattern.test(contactForm.email.trim())) {
      setContactStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    if (!contactForm.message.trim() || contactForm.message.trim().length < 8) {
      setContactStatus({
        type: 'error',
        text: 'Please share a brief note about your destination or dates.',
      });
      return;
    }

    setContactStatus({
      type: 'success',
      text: 'Thank you. Our travel desk has received your inquiry (demonstration preview).',
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <section className="se-hero">
        <img
          src={HERO_IMAGE}
          alt="Mediterranean limestone hotel terrace overlooking calm deep teal waters at golden hour"
          className="se-hero-bg"
          referrerPolicy="no-referrer"
        />
        <div className="se-hero-scrim" aria-hidden="true" />

        <div className="se-container se-hero-content">
          <p className="se-hero-eyebrow">Curated Hospitality Collection</p>
          <h1 className="se-hero-title">Discover places worth staying.</h1>
          <p className="se-hero-subtitle">
            Architectural boutique hotels, coastal palazzos, and quiet mountain lodges chosen for
            craft, light, and enduring sense of place.
          </p>

          <div className="se-hero-cta-row">
            <Link to="/hotels" className="se-btn se-btn-gold">
              Explore Hotels
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <SearchBar />
        </div>
      </section>

      <section id="destinations" className="se-section">
        <div className="se-container">
          <div className="se-section-header">
            <p className="se-section-kicker">Destinations</p>
            <div className="se-section-title-row">
              <div>
                <h2 className="se-section-title">Popular destinations</h2>
                <p className="se-section-lead">
                  Explore coastlines, historic medinas, and tranquil gardens curated around local
                  character.
                </p>
              </div>
              <Link to="/hotels" className="se-btn se-btn-outline">
                All Destinations
              </Link>
            </div>
          </div>

          <div className="se-destinations-grid">
            {popularDestinations.map((dest) => (
              <Link
                key={dest.name}
                to={`/hotels?destination=${encodeURIComponent(dest.query)}`}
                className="se-dest-card"
              >
                <img
                  src={dest.image}
                  alt={`${dest.name}, ${dest.country}`}
                  className="se-dest-img"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="se-dest-overlay">
                  <h3 className="se-dest-name">{dest.name}</h3>
                  <span className="se-dest-meta">
                    {dest.country} · {dest.staysCount}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="se-section se-section-white">
        <div className="se-container">
          <div className="se-section-header">
            <p className="se-section-kicker">Featured Collection</p>
            <div className="se-section-title-row">
              <div>
                <h2 className="se-section-title">Featured hotels</h2>
                <p className="se-section-lead">
                  Three signature residences celebrated by our guests for serene rooms and thoughtful
                  design.
                </p>
              </div>
              <Link to="/hotels" className="se-btn se-btn-primary">
                Explore Hotels
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="se-hotels-grid">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="se-section">
        <div className="se-container">
          <div className="se-about-grid">
            <div>
              <p className="se-section-kicker">Why Choose StayEase</p>
              <h2 className="se-section-title" style={{ marginTop: '10px', marginBottom: '16px' }}>
                Hospitality defined by calm precision
              </h2>
              <p className="se-section-lead">
                Rather than listing thousands of interchangeable rooms, StayEase edits down to
                independently spirited properties where architecture, light, and welcome work in
                harmony.
              </p>
            </div>

            <div className="se-pillars-list">
              <div className="se-pillar">
                <h3 className="se-pillar-title">01. Architectural Vetting</h3>
                <p className="se-pillar-copy">
                  Every property is evaluated in person for natural light, material authenticity,
                  acoustic quiet, and proximity to local culture.
                </p>
              </div>

              <div className="se-pillar">
                <h3 className="se-pillar-title">02. Transparent Nightly Pricing</h3>
                <p className="se-pillar-copy">
                  Clear nightly room rates and upfront stay summaries without hidden booking
                  markups or surprise checkout surcharges.
                </p>
              </div>

              <div className="se-pillar">
                <h3 className="se-pillar-title">03. Direct Concierge Support</h3>
                <p className="se-pillar-copy">
                  From late coastal arrivals to private seasonal dining, our concierge coordinates
                  directly with each property’s host team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="se-section se-section-white">
        <div className="se-container">
          <div className="se-section-header">
            <p className="se-section-kicker">Guest Perspectives</p>
            <h2 className="se-section-title">Stories from recent stays</h2>
          </div>

          <div className="se-testimonials-grid">
            {testimonials.map((item) => (
              <blockquote key={item.id} className="se-testimonial-card" style={{ margin: 0 }}>
                <p className="se-testimonial-quote">“{item.quote}”</p>
                <footer>
                  <p className="se-testimonial-author">{item.author}</p>
                  <span className="se-testimonial-meta">
                    {item.role} · {item.stay}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="se-section">
        <div className="se-container">
          <div className="se-contact-panel">
            <div>
              <p
                className="se-section-kicker"
                style={{ color: 'var(--se-gold)', marginBottom: '10px' }}
              >
                Contact
              </p>
              <h2 className="se-contact-title">Plan your next stay with our travel desk</h2>
              <p className="se-contact-copy">
                Looking for connecting suites, seasonal closures, or multi-stop itineraries across
                Europe, North Africa, or Japan? Send us a brief note.
              </p>
              <div className="se-contact-details">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} aria-hidden="true" />
                  concierge@stayease.example
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} aria-hidden="true" />
                  24 Place Vendôme, 75001 Paris
                </span>
              </div>
            </div>

            <form className="se-contact-form" onSubmit={handleContactSubmit} noValidate>
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}
                >
                  Full name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="se-contact-input"
                  placeholder="Camille Laurent"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}
                >
                  Email address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="se-contact-input"
                  placeholder="camille@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}
                >
                  How can we help?
                </label>
                <textarea
                  id="contact-message"
                  className="se-contact-textarea"
                  placeholder="Share preferred destination, dates, or room requirements..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                />
              </div>

              {contactStatus.text && (
                <div
                  className={`se-contact-feedback ${
                    contactStatus.type === 'error' ? 'is-error' : 'is-success'
                  }`}
                  role="alert"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {contactStatus.type === 'success' && <CheckCircle2 size={16} />}
                  <span>{contactStatus.text}</span>
                </div>
              )}

              <button type="submit" className="se-btn se-btn-accent" style={{ width: '100%' }}>
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
