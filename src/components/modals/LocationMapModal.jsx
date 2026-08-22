import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from '../../context/LocationContext';
import { useToast } from '../common/Toast';
import { Badge } from '../common/Badge';
import { MapPin, Navigation, Search, X, Crosshair, Check, Sparkles, Building2, Train, Store, Compass } from 'lucide-react';
import L from 'leaflet';

export const LocationMapModal = () => {
  const {
    selectedLocation,
    coords,
    fullAddress,
    isLocationModalOpen,
    setIsLocationModalOpen,
    updateLocation,
    reverseGeocode,
    searchLocations
  } = useLocation();

  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCoords, setActiveCoords] = useState(coords);
  const [activeAddressTitle, setActiveAddressTitle] = useState(selectedLocation);
  const [activeFullAddress, setActiveFullAddress] = useState(fullAddress);
  const [gpsStatus, setGpsStatus] = useState('idle'); // idle, locating, active, denied
  const [gpsAccuracy, setGpsAccuracy] = useState(null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Sync state on open
  useEffect(() => {
    if (isLocationModalOpen) {
      setActiveCoords(coords);
      setActiveAddressTitle(selectedLocation);
      setActiveFullAddress(fullAddress);
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isLocationModalOpen, coords, selectedLocation, fullAddress]);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!isLocationModalOpen || !mapContainerRef.current) return;

    const timer = setTimeout(() => {
      if (!mapInstanceRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          zoomControl: true,
          attributionControl: false
        }).setView([activeCoords.lat, activeCoords.lng], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);

        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div class="marker-pulse-ring"></div>
            <svg viewBox="0 0 24 24" width="34" height="34" fill="#FF4B2B" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          `,
          iconSize: [34, 34],
          iconAnchor: [17, 34]
        });

        const marker = L.marker([activeCoords.lat, activeCoords.lng], {
          icon: customIcon,
          draggable: true
        }).addTo(map);

        marker.on('dragend', async (e) => {
          const pos = e.target.getLatLng();
          handlePinMove(pos.lat, pos.lng);
        });

        map.on('click', async (e) => {
          marker.setLatLng(e.latlng);
          handlePinMove(e.latlng.lat, e.latlng.lng);
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;
      } else if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
        mapInstanceRef.current.setView([activeCoords.lat, activeCoords.lng], 16);
        if (markerRef.current) {
          markerRef.current.setLatLng([activeCoords.lat, activeCoords.lng]);
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isLocationModalOpen]);

  const handlePinMove = async (lat, lng) => {
    setActiveCoords({ lat, lng });
    const geocoded = await reverseGeocode(lat, lng);
    if (geocoded) {
      setActiveAddressTitle(geocoded.title);
      setActiveFullAddress(geocoded.full);
    }
  };

  const handleGpsRequest = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.', 'error');
      return;
    }

    setGpsStatus('locating');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = Math.round(pos.coords.accuracy || 10);

        setGpsStatus('active');
        setGpsAccuracy(acc);
        setActiveCoords({ lat, lng });

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([lat, lng], 17, { animate: true, duration: 1.2 });
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          }
        }

        const geocoded = await reverseGeocode(lat, lng);
        if (geocoded) {
          setActiveAddressTitle(geocoded.title);
          setActiveFullAddress(geocoded.full);
        }

        showToast('Live GPS location detected successfully!', 'success');
      },
      (err) => {
        setGpsStatus('denied');
        showToast('Location permission was denied. Please pick on the map.', 'info');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSearchChange = async (val) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const results = await searchLocations(val);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSelectSearchResult = (place) => {
    setActiveCoords({ lat: place.lat, lng: place.lng });
    setActiveAddressTitle(place.title);
    setActiveFullAddress(place.sub);
    setSearchQuery(place.title);
    setSearchResults([]);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([place.lat, place.lng], 16, { animate: true, duration: 1.2 });
      if (markerRef.current) {
        markerRef.current.setLatLng([place.lat, place.lng]);
      }
    }
  };

  const handleSelectHub = (hubTitle, lat, lng, full) => {
    setActiveCoords({ lat, lng });
    setActiveAddressTitle(hubTitle);
    setActiveFullAddress(full);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 16, { animate: true, duration: 1.2 });
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      }
    }
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current && activeCoords) {
      mapInstanceRef.current.flyTo([activeCoords.lat, activeCoords.lng], 17, { animate: true, duration: 0.8 });
    }
  };

  const handleConfirm = () => {
    updateLocation(activeAddressTitle, activeCoords, activeFullAddress);
    setIsLocationModalOpen(false);
    showToast(`Delivery location set to: ${activeAddressTitle}`, 'success');
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'LANDMARK': return <Sparkles size={15} />;
      case 'TRANSIT': return <Train size={15} />;
      case 'MALL': case 'COMMERCIAL': return <Building2 size={15} />;
      case 'STREET': return <Compass size={15} />;
      default: return <MapPin size={15} />;
    }
  };

  if (!isLocationModalOpen) return null;

  return (
    <div className="modal-overlay active" onClick={() => setIsLocationModalOpen(false)}>
      <div className="modal-box" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 className="modal-title">Select Delivery Location</h3>
            <Badge variant="primary" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>LIVE GPS & MAP</Badge>
          </div>
          <button className="modal-close" onClick={() => setIsLocationModalOpen(false)}>
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Body strictly contained in frame */}
        <div className="modal-body">
          
          {/* GPS Permission Action Card */}
          <div className="gps-permission-card" style={{
            background: 'linear-gradient(135deg, rgba(255, 75, 43, 0.08), rgba(255, 65, 108, 0.04))',
            border: '1px solid rgba(255, 75, 43, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 16px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Navigation size={15} color="#FF4B2B" />
                Real-Time Location Access
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {gpsStatus === 'active' ? (
                  <span style={{ color: 'var(--veg-color)', fontWeight: '700' }}>
                    <span className="gps-pulse-dot" style={{ marginRight: '6px' }}></span>
                    Live GPS Active (Accuracy: ±{gpsAccuracy || 15}m)
                  </span>
                ) : gpsStatus === 'denied' ? (
                  <span style={{ color: 'var(--nonveg-color)' }}>
                    Permission denied. Pick on map or search below.
                  </span>
                ) : (
                  "Turn on your GPS to pinpoint your exact address in real time."
                )}
              </div>
            </div>

            <button
              onClick={handleGpsRequest}
              disabled={gpsStatus === 'locating'}
              className="btn btn-primary btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '8px 18px',
                background: gpsStatus === 'active' ? '#10B981' : undefined
              }}
            >
              <Navigation size={14} />
              <span>{gpsStatus === 'locating' ? 'Locating...' : gpsStatus === 'active' ? 'GPS Active' : 'Use Current Location'}</span>
            </button>
          </div>

          {/* Google Maps style Search Bar */}
          <div className="map-search-box" style={{ position: 'relative', marginBottom: '12px' }}>
            <span className="map-search-icon" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </span>
            <input
              type="text"
              className="map-search-input"
              placeholder="Search street, area, landmark, or apartment..."
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 38px 11px 40px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border)',
                background: 'var(--surface-subtle)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
              >
                <X size={15} />
              </button>
            )}

            {/* Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="map-search-results-dropdown" style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                right: 0,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 12px 28px -4px rgba(0,0,0,0.22)',
                zIndex: 100,
                maxHeight: '230px',
                overflowY: 'auto',
                display: 'block'
              }}>
                {searchResults.map((place, i) => (
                  <div
                    key={i}
                    className="map-search-result-item"
                    onClick={() => handleSelectSearchResult(place)}
                    style={{
                      padding: '10px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      borderBottom: '1px solid var(--border)'
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {getResultIcon(place.type)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{place.title}</span>
                        <Badge variant={place.type === 'LANDMARK' ? 'warning' : place.type === 'STREET' ? 'success' : 'primary'} style={{ fontSize: '0.65rem' }}>
                          {place.type}
                        </Badge>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>{place.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Map */}
          <div className="delivery-map-wrapper">
            <div ref={mapContainerRef} className="delivery-map-container" />
            <button
              className="map-recenter-btn"
              onClick={handleRecenter}
              title="Recenter Pin"
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                zIndex: 10,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer'
              }}
            >
              <Crosshair size={18} color="#FF4B2B" />
            </button>
          </div>

          {/* Address Preview Details Card */}
          <div className="selected-address-card" style={{
            background: 'var(--surface-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px 16px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <MapPin size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '2px' }}>
                {activeAddressTitle}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '6px' }}>
                {activeFullAddress}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <Badge variant="warning" style={{ fontSize: '0.72rem', padding: '2px 7px' }}>
                  {activeCoords.lat.toFixed(4)}° N, {activeCoords.lng.toFixed(4)}° E
                </Badge>
                <Badge variant="success" style={{ fontSize: '0.72rem', padding: '2px 7px' }}>
                  30 MINS EXPRESS
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Hub Chips */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Popular Delivery Hubs
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                className={`chip ${activeAddressTitle.includes('Indiranagar') ? 'active' : ''}`}
                onClick={() => handleSelectHub('Bangalore, Indiranagar', 12.9784, 77.6408, '100 Feet Road, Indiranagar, Bangalore, 560038')}
              >
                <Badge variant="primary" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>BLR</Badge> Indiranagar
              </button>
              <button
                className={`chip ${activeAddressTitle.includes('Koramangala') ? 'active' : ''}`}
                onClick={() => handleSelectHub('Bangalore, Koramangala', 12.9352, 77.6245, '80 Feet Road, 4th Block, Koramangala, Bangalore, 560034')}
              >
                <Badge variant="primary" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>BLR</Badge> Koramangala
              </button>
              <button
                className={`chip ${activeAddressTitle.includes('Bandra') ? 'active' : ''}`}
                onClick={() => handleSelectHub('Mumbai, Bandra West', 19.0596, 72.8295, 'Hill Road, Bandra West, Mumbai, 400050')}
              >
                <Badge variant="primary" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>BOM</Badge> Bandra West
              </button>
              <button
                className={`chip ${activeAddressTitle.includes('Connaught') ? 'active' : ''}`}
                onClick={() => handleSelectHub('Delhi NCR, Connaught Place', 28.6315, 77.2167, 'Inner Circle, Connaught Place, New Delhi 110001')}
              >
                <Badge variant="primary" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>DEL</Badge> Connaught Place
              </button>
              <button
                className={`chip ${activeAddressTitle.includes('Hitec') ? 'active' : ''}`}
                onClick={() => handleSelectHub('Hyderabad, Hitec City', 17.4435, 78.3772, 'Madhapur Main Road, Hitec City, Hyderabad, 500081')}
              >
                <Badge variant="primary" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>HYD</Badge> Hitec City
              </button>
              <button
                className={`chip ${activeAddressTitle.includes('Vizianagaram') ? 'active' : ''}`}
                onClick={() => handleSelectHub('Vizianagaram, Main Road', 18.1124, 83.4074, 'Main Road, Near RTC Complex, Vizianagaram, AP 535002')}
              >
                <Badge variant="primary" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>AP</Badge> Vizianagaram
              </button>
            </div>
          </div>

        </div>

        {/* Fixed Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary btn-sm" onClick={() => setIsLocationModalOpen(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleConfirm} style={{ fontWeight: '700' }}>
            Confirm Delivery Location &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
