import React, { useState, useEffect } from 'react';

const GroceryStoreFinder: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFindStores = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError(`Error getting location: ${err.message}. Please ensure location services are enabled.`);
          setLocation(null);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="mt-6 p-4 border rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Find Nearby Grocery Stores</h3>
      <button onClick={handleFindStores} className="bg-purple-500 text-white p-2 rounded mb-2">
        Use My Location
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {location && (
        <div>
          <p>Your current location: Latitude {location.latitude}, Longitude {location.longitude}</p>
          {/* TODO: Integrate with a maps API to show stores */}
          <p className="mt-2">Nearby stores functionality coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default GroceryStoreFinder; 