import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { hotels } from '../data/hotels.js';
import './Auth.css';
import './Booking.css';

function getInitialDates() {
  const today = new Date();
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 14);
  const checkOut = new Date(today);
  checkOut.setDate(today.getDate() + 17);
  return {
    todayStr: today.toISOString().split('T')[0],
    checkInStr: checkIn.toISOString().split('T')[0],
    checkOutStr: checkOut.toISOString().split('T')[0],
  };
}

function calculateNights(start, end) {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export default function Booking({ demoUser }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { todayStr, checkInStr, checkOutStr } = getInitialDates();

  const initialHotel = hotels.find((h) => h.id === id) || hotels[0];
  const [selectedHotelId, setSelectedHotelId] = useState(initialHotel.id);
  const [checkIn, setCheckIn] = useState(checkInStr);
  const [checkOut, setCheckOut] = useState(checkOutStr);
  const [guests, setGuests] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [guestName, setGuestName] = useState(demoUser?.name || '');
  const [guestEmail, setGuestEmail] = useState(demoUser?.email || '');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const hotel = useMemo(
    () => hotels.find((h) => h.id === selectedHotelId) || hotels[0],
    [selectedHotelId]
  );

  const nightlyRate =
    selectedHotelId === initialHotel.id && location.state?.selectedRoomPrice
      ? location.state.selectedRoomPrice
      : hotel.pricePerNight;

  const roomLabel =
    selectedHotelId === initialHotel.id && location.state?.selectedRoomName
      ? location.state.selectedRoomName
      : hotel.rooms[0]?.name || 'Standard Suite';

  const nights = calculateNights(checkIn, checkOut);
  const roomSubtotal = nights * nightlyRate * roomsCount;
  const hospitalityFee = nights > 0 ? Math.round(roomSubtotal * 0.08) : 0;
  const totalAmount = roomSubtotal + hospitalityFee;

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!checkIn) {
      nextErrors.checkIn = 'Check-in date is required.';
    } else if (checkIn < todayStr) {
      nextErrors.checkIn = 'Check-in date cannot be in the past.';
    }

    if (!checkOut) {
      nextErrors.checkOut = 'Check-out date is required.';
    } else if (checkIn && checkOut <= checkIn) {
      nextErrors.checkOut = 'Check-out date must be after check-in date.';
    }

    if (guests < 1 || guests > 10) {
      nextErrors.guests = 'Select between 1 and 10 guests.';
    }

    if (roomsCount < 1 || roomsCount > hotel.availableRooms) {
      nextErrors.roomsCount = `Select between 1 and ${hotel.availableRooms} available rooms.`;
    }

    if (!guestName.trim() || guestName.trim().length < 2) {
      nextErrors.guestName = 'Guest full name is required.';
    }

    if (!guestEmail.trim()) {
      nextErrors.guestEmail = 'Guest email is required.';
    } else if (!emailPattern.test(guestEmail.trim())) {
      nextErrors.guestEmail = 'Please enter a valid email address.';
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setFormError('');

    if (Object.keys(validationErrors).length > 0) {
      setFormError('Please review the highlighted booking fields before confirming.');
      return;
    }

    const demoReference = `SE-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
    const bookingPayload = {
      reference: demoReference,
      hotel: {
        id: hotel.id,
        name: hotel.name,
        city: hotel.city,
        country: hotel.country,
        address: hotel.address,
        image: hotel.image,
      },
      roomName: roomLabel,
      checkIn,
      checkOut,
      nights,
      guests: Number(guests),
      roomsCount: Number(roomsCount),
      nightlyRate,
      roomSubtotal,
      hospitalityFee,
      totalAmount,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem('stayease_demo_confirmation', JSON.stringify(bookingPayload));
    } catch {
      // Ignore storage failures in restricted contexts
    }

    navigate('/confirmation', { state: { booking: bookingPayload } });
  };

  return (
    <section className="se-booking-page">
      <div className="se-container">
        <Link to={`/hotels/${hotel.id}`} className="se-breadcrumb">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to {hotel.name}
        </Link>

        <header className="se-booking-header">
          <p className="se-section-kicker">Demo Reservation</p>
          <h1 className="se-booking-title">Complete your stay details</h1>
          <p className="se-booking-subtitle">
            Review your dates, room count, and guest information. No payment card is required.
          </p>
        </header>

        <div className="se-booking-grid">
          <div className="se-booking-form-card">
            <form className="se-booking-form" onSubmit={handleSubmit} noValidate>
              {formError && (
                <div className="se-form-alert" role="alert">
                  <AlertCircle size={17} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="se-field-group">
                <label htmlFor="booking-hotel" className="se-field-label">
                  Hotel
                </label>
                <select
                  id="booking-hotel"
                  className="se-field-input"
                  value={selectedHotelId}
                  onChange={(e) => setSelectedHotelId(e.target.value)}
                >
                  {hotels.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} — {item.city}, {item.country} (${item.pricePerNight}/night)
                    </option>
                  ))}
                </select>
              </div>

              <div className="se-booking-row-2">
                <div className="se-field-group">
                  <label htmlFor="booking-checkin" className="se-field-label">
                    Check-in date
                  </label>
                  <input
                    id="booking-checkin"
                    type="date"
                    min={todayStr}
                    className="se-field-input tabular-nums"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    aria-invalid={Boolean(errors.checkIn)}
                  />
                  {errors.checkIn && (
                    <p className="se-field-error" role="alert">
                      {errors.checkIn}
                    </p>
                  )}
                </div>

                <div className="se-field-group">
                  <label htmlFor="booking-checkout" className="se-field-label">
                    Check-out date
                  </label>
                  <input
                    id="booking-checkout"
                    type="date"
                    min={checkIn || todayStr}
                    className="se-field-input tabular-nums"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    aria-invalid={Boolean(errors.checkOut)}
                  />
                  {errors.checkOut && (
                    <p className="se-field-error" role="alert">
                      {errors.checkOut}
                    </p>
                  )}
                </div>
              </div>

              <div className="se-booking-row-2">
                <div className="se-field-group">
                  <label htmlFor="booking-guests" className="se-field-label">
                    Number of guests
                  </label>
                  <select
                    id="booking-guests"
                    className="se-field-input tabular-nums"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <p className="se-field-error" role="alert">
                      {errors.guests}
                    </p>
                  )}
                </div>

                <div className="se-field-group">
                  <label htmlFor="booking-rooms" className="se-field-label">
                    Number of rooms
                  </label>
                  <select
                    id="booking-rooms"
                    className="se-field-input tabular-nums"
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                  >
                    {Array.from({ length: Math.min(4, hotel.availableRooms) }, (_, idx) => idx + 1).map(
                      (num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Room' : 'Rooms'}
                        </option>
                      )
                    )}
                  </select>
                  {errors.roomsCount && (
                    <p className="se-field-error" role="alert">
                      {errors.roomsCount}
                    </p>
                  )}
                </div>
              </div>

              <div className="se-booking-row-2">
                <div className="se-field-group">
                  <label htmlFor="booking-name" className="se-field-label">
                    Guest full name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    className="se-field-input"
                    placeholder="Camille Laurent"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    aria-invalid={Boolean(errors.guestName)}
                  />
                  {errors.guestName && (
                    <p className="se-field-error" role="alert">
                      {errors.guestName}
                    </p>
                  )}
                </div>

                <div className="se-field-group">
                  <label htmlFor="booking-email" className="se-field-label">
                    Guest email
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    className="se-field-input"
                    placeholder="camille@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    aria-invalid={Boolean(errors.guestEmail)}
                  />
                  {errors.guestEmail && (
                    <p className="se-field-error" role="alert">
                      {errors.guestEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="se-field-group">
                <label htmlFor="booking-notes" className="se-field-label">
                  Arrival notes (optional)
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  className="se-field-input"
                  style={{ minHeight: '84px', resize: 'vertical' }}
                  placeholder="Preferred floor, late arrival time, or dietary preferences..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button type="submit" className="se-btn se-btn-accent" style={{ width: '100%' }}>
                Confirm Demo Booking
              </button>
            </form>
          </div>

          <aside className="se-booking-summary" aria-label="Booking Summary">
            <div className="se-summary-hotel">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="se-summary-thumb"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="se-summary-hotel-name">{hotel.name}</h2>
                <span className="se-summary-hotel-loc">
                  {hotel.city}, {hotel.country}
                </span>
                <div style={{ fontSize: '0.8125rem', color: 'var(--se-teal)', marginTop: '4px' }}>
                  {roomLabel}
                </div>
              </div>
            </div>

            <div className="se-summary-lines tabular-nums">
              <div className="se-summary-line">
                <span>Dates</span>
                <strong>{nights > 0 ? `${nights} nights` : 'Select valid dates'}</strong>
              </div>
              <div className="se-summary-line">
                <span>Guests & rooms</span>
                <strong>
                  {guests} {guests === 1 ? 'guest' : 'guests'} · {roomsCount}{' '}
                  {roomsCount === 1 ? 'room' : 'rooms'}
                </strong>
              </div>
              <div className="se-summary-line">
                <span>
                  ${nightlyRate} × {nights} nights × {roomsCount} room{roomsCount > 1 ? 's' : ''}
                </span>
                <strong>${roomSubtotal.toLocaleString()}</strong>
              </div>
              <div className="se-summary-line">
                <span>Hospitality & local taxes (8%)</span>
                <strong>${hospitalityFee.toLocaleString()}</strong>
              </div>
            </div>

            <div className="se-summary-total tabular-nums">
              <span>Total estimated stay</span>
              <span>${totalAmount.toLocaleString()}</span>
            </div>

            <div className="se-summary-demo-box">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                  color: 'var(--se-teal)',
                  marginBottom: '4px',
                }}
              >
                <ShieldCheck size={15} aria-hidden="true" />
                Demonstration Booking Only
              </div>
              No payment card details are collected and no live hotel reservation will be charged.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
