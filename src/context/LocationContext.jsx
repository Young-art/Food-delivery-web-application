import React, { createContext, useContext, useState, useEffect } from 'react';
import { INDIAN_LANDMARKS_DB } from '../data/mockData';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return localStorage.getItem('food_app_location') || 'Bangalore, Indiranagar';
  });

  const [coords, setCoords] = useState(() => {
    const saved = localStorage.getItem('food_app_coords');
    return saved ? JSON.parse(saved) : { lat: 12.9784, lng: 77.6408 };
  });

  const [fullAddress, setFullAddress] = useState(() => {
    return localStorage.getItem('food_app_full_address') || '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038';
  });

  const [isGpsActive, setIsGpsActive] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('food_app_location', selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    localStorage.setItem('food_app_coords', JSON.stringify(coords));
  }, [coords]);

  useEffect(() => {
    localStorage.setItem('food_app_full_address', fullAddress);
  }, [fullAddress]);

  const updateLocation = (title, newCoords, fullAddr) => {
    setSelectedLocation(title);
    if (newCoords) setCoords(newCoords);
    if (fullAddr) setFullAddress(fullAddr);
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await res.json();
      if (data && data.address) {
        const addr = data.address;
        const road = addr.road || addr.street || addr.pedestrian || addr.suburb || "Main Road";
        const locality = addr.suburb || addr.neighbourhood || addr.city_district || addr.residential || "";
        const city = addr.city || addr.town || addr.state_district || "Bangalore";
        const state = addr.state || "";
        const postcode = addr.postcode || "";

        const formattedTitle = locality ? `${city}, ${locality}` : (road ? `${city}, ${road}` : city);
        const fullFormatted = [road, locality, city, state, postcode].filter(Boolean).join(", ");

        return {
          title: formattedTitle,
          full: fullFormatted || data.display_name
        };
      }
    } catch (e) {}

    // Fallback to nearest city
    return getNearestCityFallback(lat, lng);
  };

  const getNearestCityFallback = (lat, lng) => {
    const hubs = [
      { name: "Bangalore, Indiranagar", full: "100 Feet Road, Indiranagar, Bangalore, Karnataka 560038", lat: 12.9784, lng: 77.6408 },
      { name: "Bangalore, Koramangala", full: "80 Feet Road, 4th Block, Koramangala, Bangalore, Karnataka 560034", lat: 12.9352, lng: 77.6245 },
      { name: "Mumbai, Bandra West", full: "Hill Road, Bandra West, Mumbai, Maharashtra 400050", lat: 19.0596, lng: 72.8295 },
      { name: "Delhi NCR, Connaught Place", full: "Inner Circle, Connaught Place, New Delhi 110001", lat: 28.6315, lng: 77.2167 },
      { name: "Hyderabad, Hitec City", full: "Madhapur Main Road, Hitec City, Hyderabad, Telangana 500081", lat: 17.4435, lng: 78.3772 },
      { name: "Pune, Koregaon Park", full: "North Main Road, Koregaon Park, Pune, Maharashtra 411001", lat: 18.5362, lng: 73.8940 },
      { name: "Vizianagaram, Main Road", full: "Main Road, Near RTC Complex, Vizianagaram, Andhra Pradesh 535002", lat: 18.1124, lng: 83.4074 },
      { name: "Visakhapatnam, RK Beach", full: "Ramakrishna Beach Road, Visakhapatnam, Andhra Pradesh 530003", lat: 17.7126, lng: 83.3242 }
    ];

    let closest = hubs[0];
    let minDist = Infinity;
    hubs.forEach(hub => {
      const dist = Math.hypot(hub.lat - lat, hub.lng - lng);
      if (dist < minDist) {
        minDist = dist;
        closest = hub;
      }
    });

    return { title: closest.name, full: closest.full };
  };

  const searchLocations = async (query) => {
    const qLower = query.toLowerCase();

    // 1. Instant local matching
    const localMatches = INDIAN_LANDMARKS_DB.filter(item => {
      return item.title.toLowerCase().includes(qLower) || item.sub.toLowerCase().includes(qLower);
    });

    // 2. Query Photon Geocoder
    try {
      const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=8&lang=en`);
      const data = await res.json();
      let external = [];
      if (data && data.features && data.features.length > 0) {
        external = data.features.map(f => {
          const props = f.properties || {};
          const name = props.name || props.street || props.city || "Location";
          const street = props.street || "";
          const locality = props.district || props.suburb || props.locality || "";
          const city = props.city || props.state || "";
          const state = props.state || "";
          const postcode = props.postcode || "";
          const fullDesc = [street, locality, city, state, postcode].filter(Boolean).join(", ") || props.formatted || name;

          let cat = "LOCATION";
          if (props.osm_key === "highway") cat = "STREET";
          else if (props.osm_key === "amenity" || props.osm_key === "tourism") cat = "LANDMARK";
          else if (props.osm_key === "railway" || props.osm_key === "public_transport") cat = "TRANSIT";
          else if (props.osm_key === "shop" || props.osm_key === "building") cat = "COMMERCIAL";

          return {
            title: name,
            sub: fullDesc,
            type: cat,
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0]
          };
        });
      }

      // Merge and deduplicate
      const combined = [...localMatches];
      external.forEach(em => {
        if (!combined.some(c => Math.abs(c.lat - em.lat) < 0.002 && Math.abs(c.lng - em.lng) < 0.002)) {
          combined.push(em);
        }
      });

      return combined;
    } catch (e) {
      return localMatches;
    }
  };

  return (
    <LocationContext.Provider value={{
      selectedLocation,
      coords,
      fullAddress,
      isGpsActive,
      isLocationModalOpen,
      setIsLocationModalOpen,
      setIsGpsActive,
      updateLocation,
      reverseGeocode,
      searchLocations
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
