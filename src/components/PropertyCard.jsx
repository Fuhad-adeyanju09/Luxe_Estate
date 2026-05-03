import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, CheckCircle } from 'lucide-react';

const getEpcColor = (rating) => {
  const colors = {
    'A': 'bg-green-600',
    'B': 'bg-green-500',
    'C': 'bg-lime-500',
    'D': 'bg-yellow-500',
    'E': 'bg-orange-500',
    'F': 'bg-red-500',
    'G': 'bg-red-700',
  };
  return colors[rating] || 'bg-slate-500';
};

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.images && property.images.length > 0 ? property.images[0] : 'https://placehold.co/800x600/0f172a/ffffff?text=NO+IMAGE'} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute top-4 left-4 bg-navy-900 text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
          {property.status}
        </div>
        <div className="absolute top-4 left-24 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wide shadow-sm">
          {property.purpose}
        </div>
        {property.epcRating && (
          <div className={`absolute bottom-4 left-4 ${getEpcColor(property.epcRating)} text-white px-3 py-1 rounded text-sm font-bold shadow-sm border border-white/20`}>
            EPC {property.epcRating}
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-navy-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          £{property.price.toLocaleString()}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-xl font-bold text-navy-900 line-clamp-1 flex-1">{property.title}</h3>
          {property.verified && (
            <div className="flex items-center text-gold-500 shrink-0" title="Verified Listing">
              <CheckCircle className="w-5 h-5 fill-gold-50" />
            </div>
          )}
        </div>
        
        <div className="flex items-center text-slate-500 mb-4 text-sm">
          <MapPin className="h-4 w-4 mr-1 text-gold-500" />
          <span className="line-clamp-1">{property.address}</span>
        </div>

        <div className="flex items-center justify-between border-t border-b border-slate-100 py-4 mb-4 mt-auto text-slate-600">
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-navy-900" />
            <span className="font-medium">{property.beds} <span className="text-sm font-normal text-slate-400">Beds</span></span>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <Bath className="h-5 w-5 text-navy-900" />
            <span className="font-medium">{property.baths} <span className="text-sm font-normal text-slate-400">Baths</span></span>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <Square className="h-5 w-5 text-navy-900" />
            <span className="font-medium">{property.sqft} <span className="text-sm font-normal text-slate-400">Sqft</span></span>
          </div>
        </div>

        <Link 
          to={`/property/${property._id}`}
          className="w-full block text-center py-3 rounded-xl border-2 border-navy-900 text-navy-900 font-bold hover:bg-navy-900 hover:text-white transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
