/**
 * SearchBar Component
 * Location search with recent searches and keyboard support
 */

'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
  onGetCurrentLocation?: () => void;
  geoLoading?: boolean;
}

export default function SearchBar({ onSearch, loading, onGetCurrentLocation, geoLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('climavue-recent-searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      performSearch(query.trim());
    }
  };

  const performSearch = (city: string) => {
    onSearch(city);
    setQuery('');
    setShowRecent(false);

    // Add to recent searches (max 5)
    const updated = [city, ...recentSearches.filter(s => s.toLowerCase() !== city.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    
    try {
      localStorage.setItem('climavue-recent-searches', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        {onGetCurrentLocation && (
          <button
            type="button"
            onClick={onGetCurrentLocation}
            className={styles.locationButton}
            disabled={loading || geoLoading}
            aria-label="Get current location weather"
            title="Use my location"
          >
            {geoLoading ? (
              <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
              </svg>
            )}
          </button>
        )}
        <div className={styles.inputWrapper}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowRecent(true)}
            onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            placeholder="Search for a city..."
            className={styles.searchInput}
            disabled={loading}
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        <button type="submit" className={styles.searchButton} disabled={loading || !query.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Recent Searches */}
      {showRecent && recentSearches.length > 0 && (
        <div className={styles.recentSearches}>
          <div className={styles.recentHeader}>Recent Searches</div>
          {recentSearches.map((city, index) => (
            <button
              key={index}
              className={styles.recentItem}
              onClick={() => performSearch(city)}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
