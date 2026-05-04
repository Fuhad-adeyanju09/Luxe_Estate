import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home as PropertyType, PoundSterling, Key } from 'lucide-react';

const HeroSection = () => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [purpose, setPurpose] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (type) params.append('type', type);
    if (price) params.append('price', price);
    if (purpose) params.append('purpose', purpose);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
          alt="UK Street of Houses"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1920x1080/0f172a/ffffff?text=Luxe+Estates'; }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/65" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block py-1 px-4 rounded-full bg-gold-500/20 text-gold-400 font-semibold tracking-wider text-sm mb-6 border border-gold-500/30 backdrop-blur-sm">
          🇬🇧 UK PROPERTY SEARCH
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Find Your Perfect <span className="text-gold-500">Home</span> in the UK
        </h2>
        <p className="mt-4 text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 font-light">
          Search thousands of properties for sale and rent across England, Scotland and Wales.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-3 md:p-4 rounded-2xl shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-3 backdrop-blur-md bg-white/97"
        >
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gold-500 transition-all">
            <Key className="text-slate-400 h-5 w-5 mr-3 flex-shrink-0" />
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-800 appearance-none cursor-pointer text-sm"
            >
              <option value="">Buy or Rent?</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gold-500 transition-all">
            <MapPin className="text-slate-400 h-5 w-5 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="City, town or postcode..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm"
            />
          </div>

          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gold-500 transition-all">
            <PropertyType className="text-slate-400 h-5 w-5 mr-3 flex-shrink-0" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-800 appearance-none cursor-pointer text-sm"
            >
              <option value="">Property Type</option>
              <option value="terraced">Terraced House</option>
              <option value="semi-detached">Semi-Detached</option>
              <option value="detached">Detached House</option>
              <option value="flat">Flat / Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="cottage">Cottage</option>
            </select>
          </div>

          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gold-500 transition-all">
            <PoundSterling className="text-slate-400 h-5 w-5 mr-3 flex-shrink-0" />
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-800 appearance-none cursor-pointer text-sm"
            >
              <option value="">Max Price</option>
              <option value="0-200">Under £200,000</option>
              <option value="200-400">£200,000 – £400,000</option>
              <option value="400-600">£400,000 – £600,000</option>
              <option value="600+">£600,000+</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-navy-900 hover:bg-gold-500 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center transition-colors duration-300 shadow-lg shadow-navy-900/20 w-full md:w-auto group"
          >
            <Search className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Search
          </button>
        </form>

        {/* Quick Stats */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-white/70 text-sm">
          <span>🏠 <strong className="text-white">10,000+</strong> Properties</span>
          <span>📍 <strong className="text-white">500+</strong> UK Locations</span>
          <span>✅ <strong className="text-white">Verified</strong> Listings</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
