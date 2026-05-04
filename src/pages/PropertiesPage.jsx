import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const [filterPurpose, setFilterPurpose] = useState(params.get('purpose') || '');
  const [filterType, setFilterType] = useState(params.get('type') || '');
  const [filterPrice, setFilterPrice] = useState(params.get('price') || '');
  const [filterLocation, setFilterLocation] = useState(params.get('location') || '');

  const applyFilters = () => {
    const p = new URLSearchParams();
    if (filterPurpose) p.set('purpose', filterPurpose);
    if (filterType) p.set('type', filterType);
    if (filterPrice) p.set('price', filterPrice);
    if (filterLocation) p.set('location', filterLocation);
    navigate(`/properties?${p.toString()}`);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilterPurpose(''); setFilterType(''); setFilterPrice(''); setFilterLocation('');
    navigate('/properties');
  };

  const hasFilters = !!(params.get('purpose') || params.get('type') || params.get('price') || params.get('location'));

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/properties${location.search}`);
        if (!response.ok) throw new Error('Failed to fetch properties');
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy-900 mb-2">UK Properties</h1>
          <p className="text-slate-600">
            Showing <strong>{properties.length}</strong> properties {hasFilters && '(filtered)'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Buy or Rent</label>
            <select value={filterPurpose} onChange={e => setFilterPurpose(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50">
              <option value="">All</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Property Type</label>
            <select value={filterType} onChange={e => setFilterType(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50">
              <option value="">All Types</option>
              <option value="terraced">Terraced House</option>
              <option value="semi-detached">Semi-Detached</option>
              <option value="detached">Detached House</option>
              <option value="flat">Flat / Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="cottage">Cottage</option>
            </select>
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Max Price (£)</label>
            <select value={filterPrice} onChange={e => setFilterPrice(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50">
              <option value="">Any Price</option>
              <option value="0-200">Under £200,000</option>
              <option value="200-400">£200k – £400k</option>
              <option value="400-600">£400k – £600k</option>
              <option value="600+">£600,000+</option>
            </select>
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Location</label>
            <input type="text" placeholder="City or town..." value={filterLocation} onChange={e => setFilterLocation(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50" />
          </div>
          <div className="flex gap-2">
            <button onClick={applyFilters}
              className="bg-navy-900 hover:bg-gold-500 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" /> Search
            </button>
            {hasFilters && (
              <button onClick={clearFilters}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-1">
                <X className="w-4 h-4" /> Clear
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xl text-navy-900 font-semibold">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-xl text-red-500 font-semibold">Could not load properties. Please try again.</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-2xl text-navy-900 font-semibold mb-2">No properties found</p>
            <p className="text-slate-500 mb-6">Try adjusting your search filters</p>
            <button onClick={clearFilters} className="bg-gold-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gold-600 transition-colors">Clear Filters</button>
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
