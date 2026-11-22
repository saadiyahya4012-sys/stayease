import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Info } from 'lucide-react';
import { hotels } from '../data/hotels.js';
import './Confirmation.css';

function getStoredConfirmation() {
  try {
    const raw = sessionStorage.getItem('stayease_demo_confirmation');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function Confirmation() {
  const location = useLocation();
  const stateBooking = location.state?.booking;
  const storedBooking = getStoredConfirmation();

  const fallbackHotel = hotels[0];
  const booking = stateBooking ||
    storedBooking || {
      reference: 'SE-DEMO-482910',
      hotel: {
        id: fallbackHotel.id,
        name: fallbackHotel.name,
        city: fallbackHotel.city,
        country: fallbackHotel.country,
        address: fallbackHotel.address,
        image: fallbackHotel.image,
      },
      roomName: fallbackHotel.rooms[0].name,
      checkIn: '2026-12-06',
      checkOut: '2026-12-09',
      nights: 3,
      guests: 2,
      roomsCount: 1,
      totalAmount: 1555,
      guestName: 'Demo Guest',
      guestEmail: 'guest@stayease.example',
    };

  return (
    <section className="se-confirmation-page">
      <div className="se-container">
        <div className="se-confirmation-card">
          <div className="se-confirmation-banner">
            <p className="se-confirmation-kicker">
              <CheckCircle2 size={16} aria-hidden="true" />
              Demo Booking Confirmed
            </p>
            <h1 className="se-confirmation-title">Your demonstration itinerary is ready</h1>
            <p className="se-confirmation-ref tabular-nums">
              Demo Reference: <strong>{booking.reference}</strong>
            </p>
          </div>

          <div className="se-confirmation-body">
            <div className="se-demo-alert-box" role="note">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <Info size={16} color="#C87559" aria-hidden="true" />
                <span>Demonstration Notice</span>
              </div>
              <p style={{ margin: '6px 0 0' }}>
                This is a demonstration booking for preview purposes only, not a real hotel
                reservation. No payment was processed and no room has been held.
              </p>
            </div>

            <div className="se-confirmation-hotel">
              <img
                src={booking.hotel.image}
                alt={booking.hotel.name}
                className="se-confirmation-img"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--se-font-display)',
                    fontSize: '1.75rem',
                    color: 'var(--se-teal)',
                    margin: '0 0 6px',
                  }}
                >
                  {booking.hotel.name}
                </h2>
                <p style={{ margin: '0 0 4px', color: 'var(--se-ink)' }}>
                  {booking.hotel.city}, {booking.hotel.country}
                </p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--se-ink-muted)' }}>
                  {booking.hotel.address}
                </p>
              </div>
            </div>

            <div className="se-confirmation-details-grid tabular-nums">
              <div>
                <span className="se-detail-item-label">Guest Name</span>
                <span className="se-detail-item-val">{booking.guestName}</span>
              </div>
              <div>
                <span className="se-detail-item-label">Guest Email</span>
                <span className="se-detail-item-val">{booking.guestEmail}</span>
              </div>
              <div>
                <span className="se-detail-item-label">Check-in</span>
                <span className="se-detail-item-val">{booking.checkIn}</span>
              </div>
              <div>
                <span className="se-detail-item-label">Check-out</span>
                <span className="se-detail-item-val">
                  {booking.checkOut} ({booking.nights} nights)
                </span>
              </div>
              <div>
                <span className="se-detail-item-label">Room Selection</span>
                <span className="se-detail-item-val">
                  {booking.roomName} · {booking.roomsCount}{' '}
                  {booking.roomsCount === 1 ? 'room' : 'rooms'}
                </span>
              </div>
              <div>
                <span className="se-detail-item-label">Guests</span>
                <span className="se-detail-item-val">
                  {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                </span>
              </div>
            </div>

            <div className="se-confirmation-total-row tabular-nums">
              <span>Demo Total Amount</span>
              <span>${booking.totalAmount.toLocaleString()}</span>
            </div>

            <div className="se-confirmation-actions">
              <Link to="/hotels" className="se-btn se-btn-primary">
                Browse More Hotels
              </Link>
              <Link to="/" className="se-btn se-btn-outline">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
