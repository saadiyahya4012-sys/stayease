import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BedDouble, Check, MapPin, Star } from 'lucide-react';
import { hotels } from '../data/hotels.js';
import './HotelDetails.css';

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find((item) => item.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

  if (!hotel) {
    return (
      <section className="se-details-page">
        <div className="se-container">
          <div className="se-empty-state" style={{ padding: '64px 24px', textAlign: 'center' }}>
            <h1 className="se-details-title">Hotel not found</h1>
            <p style={{ color: 'var(--se-ink-muted)', marginBottom: '24px' }}>
              The property you are looking for is not in our current collection.
            </p>
            <Link to="/hotels" className="se-btn se-btn-primary">
              Browse All Hotels
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const gallery = hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery : [hotel.image];
  const selectedRoom = hotel.rooms[selectedRoomIndex] || hotel.rooms[0];

  const handleBookNow = () => {
    navigate(`/booking/${hotel.id}`, {
      state: {
        selectedRoomName: selectedRoom?.name,
        selectedRoomPrice: selectedRoom?.price || hotel.pricePerNight,
      },
    });
  };

  return (
    <section className="se-details-page">
      <div className="se-container">
        <Link to="/hotels" className="se-breadcrumb">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to all hotels
        </Link>

        <header className="se-details-header">
          <h1 className="se-details-title">{hotel.name}</h1>
          <div className="se-details-meta">
            <span className="se-details-meta-item">
              <MapPin size={16} aria-hidden="true" />
              {hotel.city}, {hotel.country}
            </span>
            <span aria-hidden="true">·</span>
            <span className="se-details-meta-item tabular-nums">
              <Star size={16} fill="#DDAA78" color="#DDAA78" aria-hidden="true" />
              {hotel.rating.toFixed(1)} / 5 ({hotel.reviewCount} reviews)
            </span>
            <span aria-hidden="true">·</span>
            <span className="se-details-meta-item tabular-nums">
              {hotel.availableRooms} rooms available
            </span>
          </div>
        </header>

        <div className="se-gallery">
          <div className="se-gallery-main">
            <img
              src={gallery[activeImageIndex]}
              alt={`${hotel.name} view ${activeImageIndex + 1}`}
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="se-gallery-thumbs" role="group" aria-label="Hotel photo gallery">
            {gallery.map((imgSrc, index) => (
              <button
                key={`${hotel.id}-thumb-${index}`}
                type="button"
                className={`se-gallery-thumb ${activeImageIndex === index ? 'is-active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`View photo ${index + 1} of ${hotel.name}`}
              >
                <img
                  src={imgSrc}
                  alt={`${hotel.name} thumbnail ${index + 1}`}
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="se-details-layout">
          <div>
            <div className="se-details-section">
              <h2 className="se-details-heading">About this property</h2>
              <p className="se-details-description">{hotel.description}</p>
              <p className="se-details-address">Address: {hotel.address}</p>
            </div>

            <div className="se-details-section">
              <h2 className="se-details-heading">Available rooms</h2>
              <div className="se-rooms-list">
                {hotel.rooms.map((room, index) => {
                  const isSelected = selectedRoomIndex === index;
                  return (
                    <button
                      key={room.name}
                      type="button"
                      className={`se-room-option ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedRoomIndex(index)}
                    >
                      <div className="se-room-top">
                        <h3 className="se-room-name">{room.name}</h3>
                        <span className="se-room-price tabular-nums">${room.price} / night</span>
                      </div>
                      <div className="se-room-specs tabular-nums">
                        <BedDouble
                          size={15}
                          style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }}
                          aria-hidden="true"
                        />
                        {room.bed} · {room.size} · Up to {room.capacity} guests · {room.remaining} left
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="se-details-section">
              <h2 className="se-details-heading">Amenities & services</h2>
              <div className="se-amenities-grid">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="se-amenity-item">
                    <Check size={16} color="#123C3A" aria-hidden="true" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="se-booking-aside" aria-label="Stay reservation summary">
            <div className="se-aside-price">
              <span className="se-aside-amount tabular-nums">
                ${selectedRoom?.price || hotel.pricePerNight}
              </span>
              <span style={{ color: 'var(--se-ink-muted)', fontSize: '0.9375rem' }}>
                / night
              </span>
            </div>

            <div className="se-aside-row">
              <span>Selected suite</span>
              <strong>{selectedRoom?.name}</strong>
            </div>
            <div className="se-aside-row">
              <span>Location</span>
              <strong>
                {hotel.city}, {hotel.country}
              </strong>
            </div>
            <div className="se-aside-row tabular-nums">
              <span>Available rooms</span>
              <strong>{selectedRoom?.remaining ?? hotel.availableRooms} remaining</strong>
            </div>

            <button
              type="button"
              className="se-btn se-btn-accent"
              style={{ width: '100%', marginTop: '12px' }}
              onClick={handleBookNow}
            >
              Reserve This Stay
            </button>

            <p className="se-aside-note">
              Free demo cancellation. Selecting Reserve opens the reservation summary where you
              can choose dates, guests, and rooms.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
