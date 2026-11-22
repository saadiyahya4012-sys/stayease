import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, MapPin, Star } from 'lucide-react';
import './HotelCard.css';

export default function HotelCard({ hotel }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="se-hotel-card">
      <Link to={`/hotels/${hotel.id}`} className="se-hotel-card-media">
        {!imgError ? (
          <img
            src={hotel.image}
            alt={`${hotel.name} in ${hotel.city}, ${hotel.country}`}
            className="se-hotel-card-img"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="se-hotel-card-fallback">
            <Building2 size={28} aria-hidden="true" />
            <span>{hotel.name}</span>
          </div>
        )}
      </Link>

      <div className="se-hotel-card-body">
        <div className="se-hotel-card-meta">
          <span className="se-hotel-card-location">
            <MapPin size={14} aria-hidden="true" />
            {hotel.city}, {hotel.country}
          </span>
          <span className="se-hotel-card-rating tabular-nums">
            <Star size={14} fill="#DDAA78" color="#DDAA78" aria-hidden="true" />
            {hotel.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="se-hotel-card-title">
          <Link to={`/hotels/${hotel.id}`}>{hotel.name}</Link>
        </h3>

        <p className="se-hotel-card-desc">{hotel.shortDescription}</p>

        <div className="se-hotel-card-footer">
          <div className="se-hotel-card-price">
            <span className="se-hotel-card-amount tabular-nums">${hotel.pricePerNight}</span>
            <span className="se-hotel-card-night">/ night</span>
          </div>

          <Link to={`/hotels/${hotel.id}`} className="se-btn se-btn-primary">
            View details
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
