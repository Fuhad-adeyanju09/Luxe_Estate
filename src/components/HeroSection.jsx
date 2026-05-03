import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home as PropertyType, DollarSign, Key } from 'lucide-react';

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
          src="https://placehold.co/1920x1080/0f172a/ffffff?text=Luxury+Home+Exterior" 
          alt="Luxury Home" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-gold-500/20 text-gold-500 font-semibold tracking-wider text-sm mb-6 border border-gold-500/30 backdrop-blur-sm">
          PREMIUM REAL ESTATE
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Find Your <span className="text-gold-500">Dream Home</span>
        </h2>
        <p className="mt-4 text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 font-light">
          Discover exclusive luxury properties in the most prestigious neighborhoods.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-4 backdrop-blur-md bg-white/95">
          
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gold-500 transition-all">
            <Key className="text-slate-400 h-5 w-5 mr-3" />
            <select 
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-800 appearance-none cursor-pointer"
            >
              <option value="">Any Purpose</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gold-500 transition-all">
            <MapPin className="text-slate-400 h-5 w-5 mr-3" />
            <input 
              type="text" 
              placeholder="Location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gold-500 transition-all">
            <PropertyType className="text-slate-400 h-5 w-5 mr-3" />
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-800 appearance-none cursor-pointer"
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>

          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gold-500 transition-all">
            <DollarSign className="text-slate-400 h-5 w-5 mr-3" />
            <select 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-800 appearance-none cursor-pointer"
            >
              <option value="">Price Range</option>
              <option value="1-5">$1M - $5M</option>
              <option value="5-10">$5M - $10M</option>
              <option value="10+">$10M+</option>
            </select>
          </div>

          <button type="submit" className="bg-navy-900 hover:bg-gold-500 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center transition-colors duration-300 shadow-lg shadow-navy-900/20 w-full md:w-auto group">
            <Search className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Search
          </button>

        </form>
      </div>
    </section>
  );
};

export default HeroSection;
