import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';

const FeaturedListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        setProperties(data.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <section id="listings" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-3">New Listings</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">Featured Properties</h3>
          <p className="text-lg text-slate-600">
            Browse our latest properties for sale and rent across the UK — from city flats to family homes and everything in between.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-xl text-navy-900 font-semibold animate-pulse">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-xl text-red-500 font-semibold">Could not load properties. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/properties"
            className="inline-block bg-transparent border-2 border-navy-900 text-navy-900 px-10 py-3 rounded-full font-bold hover:bg-navy-900 hover:text-white transition-all duration-300"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
