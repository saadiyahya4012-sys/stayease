import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Search, Users } from 'lucide-react';
import './SearchBar.css';

function getDefaultDates() {
  const today = new Date();
  const checkInDate = new Date(today);
  checkInDate.setDate(today.getDate() + 14);
  const checkOutDate = new Date(today);
  checkOutDate.setDate(today.getDate() + 17);

  const fmt = (d) => d.toISOString().split('T')[0];
  return { checkIn: fmt(checkInDate), checkOut: fmt(checkOutDate) };
}

export default function SearchBar({ initialValues = {} }) {
  const navigate = useNavigate();
  const defaults = getDefaultDates();

  const [destination, setDestination] = useState(initialValues.destination || '');
  const [checkIn, setCheckIn] = useState(initialValues.checkIn || defaults.checkIn);
  const [checkOut, setCheckOut] = useState(initialValues.checkOut || defaults.checkOut);
  const [guests, setGuests] = useState(initialValues.guests || '2');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkIn && checkOut && checkOut <= checkIn) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    setError('');
    const params = new URLSearchParams();
    if (destination.trim()) params.set('destination', destination.trim());
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);

    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <form className="se-searchbar" onSubmit={handleSubmit} noValidate>
      <div className="se-searchbar-grid">
        <div className="se-search-field">
          <label htmlFor="search-destination" className="se-search-label">
            <MapPin size={13} aria-hidden="true" />
            Destination
          </label>
          <input
            id="search-destination"
            type="text"
            className="se-search-input"
            placeholder="Amalfi, Kyoto, Paris..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="se-search-field">
          <label htmlFor="search-checkin" className="se-search-label">
            <Calendar size={13} aria-hidden="true" />
            Check-in
          </label>
          <input
            id="search-checkin"
            type="date"
            className="se-search-input tabular-nums"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="se-search-field">
          <label htmlFor="search-checkout" className="se-search-label">
            <Calendar size={13} aria-hidden="true" />
            Check-out
          </label>
          <input
            id="search-checkout"
            type="date"
            className="se-search-input tabular-nums"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="se-search-field">
          <label htmlFor="search-guests" className="se-search-label">
            <Users size={13} aria-hidden="true" />
            Guests
          </label>
          <select
            id="search-guests"
            className="se-search-input tabular-nums"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="6">6 Guests</option>
          </select>
        </div>

        <button type="submit" className="se-btn se-btn-accent se-search-submit">
          <Search size={17} aria-hidden="true" />
          Search
        </button>
      </div>

      {error && (
        <p className="se-search-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
