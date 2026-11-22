import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Search } from 'lucide-react';
import HotelCard from '../components/HotelCard.jsx';
import { hotels } from '../data/hotels.js';
import './Hotels.css';

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('destination') || '';
  const checkInParam = searchParams.get('checkIn') || '';
  const checkOutParam = searchParams.get('checkOut') || '';
  const guestsParam = searchParams.get('guests') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    setSearchTerm(searchParams.get('destination') || '');
  }, [searchParams]);

  const filteredHotels = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const matches = hotels.filter((hotel) => {
      const matchesText =
        !query ||
        hotel.name.toLowerCase().includes(query) ||
        hotel.city.toLowerCase().includes(query) ||
        hotel.country.toLowerCase().includes(query) ||
        hotel.region.toLowerCase().includes(query);

      let matchesPrice = true;
      if (priceFilter === 'under-400') matchesPrice = hotel.pricePerNight < 400;
      if (priceFilter === '400-550')
        matchesPrice = hotel.pricePerNight >= 400 && hotel.pricePerNight <= 550;
      if (priceFilter === 'above-550') matchesPrice = hotel.pricePerNight > 550;

      let matchesRating = true;
      if (ratingFilter === '4.7') matchesRating = hotel.rating >= 4.7;
      if (ratingFilter === '4.8') matchesRating = hotel.rating >= 4.8;
      if (ratingFilter === '4.9') matchesRating = hotel.rating >= 4.9;

      return matchesText && matchesPrice && matchesRating;
    });

    const sorted = [...matches];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === 'rating-desc') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [searchTerm, priceFilter, ratingFilter, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setPriceFilter('all');
    setRatingFilter('all');
    setSortBy('recommended');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    priceFilter !== 'all' ||
    ratingFilter !== 'all' ||
    sortBy !== 'recommended';

  return (
    <section className="se-hotels-page">
      <div className="se-container">
        <header className="se-hotels-header">
          <p className="se-section-kicker">Curated Collection</p>
          <h1 className="se-hotels-title">Explore our hotels</h1>
          <p className="se-hotels-subtitle">
            Browse coastal palazzos, historic riads, and alpine lodges selected for warmth, calm,
            and architecture.
          </p>
        </header>

        <div className="se-filters-bar">
          <div className="se-filter-group">
            <label htmlFor="hotel-search" className="se-filter-label">
              Hotel or Destination
            </label>
            <div className="se-filter-search-wrap">
              <Search size={16} className="se-filter-search-icon" aria-hidden="true" />
              <input
                id="hotel-search"
                type="text"
                className="se-filter-control se-filter-search-input"
                placeholder="Search by name, city, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="se-filter-group">
            <label htmlFor="price-filter" className="se-filter-label">
              Price per Night
            </label>
            <select
              id="price-filter"
              className="se-filter-control"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under-400">Under $400</option>
              <option value="400-550">$400 – $550</option>
              <option value="above-550">$550+</option>
            </select>
          </div>

          <div className="se-filter-group">
            <label htmlFor="rating-filter" className="se-filter-label">
              Minimum Rating
            </label>
            <select
              id="rating-filter"
              className="se-filter-control tabular-nums"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="4.7">4.7+ Stars</option>
              <option value="4.8">4.8+ Stars</option>
              <option value="4.9">4.9+ Stars</option>
            </select>
          </div>

          <div className="se-filter-group">
            <label htmlFor="sort-by" className="se-filter-label">
              Sort By
            </label>
            <select
              id="sort-by"
              className="se-filter-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button type="button" className="se-btn se-btn-outline" onClick={handleReset}>
              <RotateCcw size={15} aria-hidden="true" />
              Reset
            </button>
          )}
        </div>

        <div className="se-results-meta">
          <span className="tabular-nums">
            Showing {filteredHotels.length} of {hotels.length} stays
          </span>
          {(checkInParam || checkOutParam || guestsParam) && (
            <span className="tabular-nums">
              {checkInParam && checkOutParam ? `${checkInParam} to ${checkOutParam}` : ''}
              {guestsParam ? ` · ${guestsParam} guest${Number(guestsParam) > 1 ? 's' : ''}` : ''}
            </span>
          )}
        </div>

        {filteredHotels.length > 0 ? (
          <div className="se-hotels-catalog-grid">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="se-empty-state">
            <h2 className="se-empty-title">No stays match these filters</h2>
            <p className="se-empty-copy">
              Try clearing your destination query or widening your nightly rate range.
            </p>
            <button type="button" className="se-btn se-btn-primary" onClick={handleReset}>
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
