import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { Search } from 'lucide-react';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // useLocation().search contains the query string, e.g. ?location=Miami&type=house&price=1-5
        const response = await fetch(`/api/properties${location.search}`);
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location.search]);

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-navy-900 mb-2">Our Properties</h1>
            <p className="text-slate-600">Showing {properties.length} exclusive listings</p>
          </div>
          
          {location.search && (
            <div className="mt-4 md:mt-0 px-4 py-2 bg-gold-500/10 text-gold-600 rounded-full text-sm font-semibold border border-gold-500/20 flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Filtered Results
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-navy-900 font-semibold">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-xl text-red-500 font-semibold">Error: {error}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-2xl text-navy-900 font-semibold mb-2">No properties found</p>
            <p className="text-slate-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
