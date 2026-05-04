import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../contexts/CurrencyContext';
import { Bed, Bath, Square, MapPin, CheckCircle } from 'lucide-react';

const getEpcColor = (rating) => {
  const colors = {
    A: 'bg-green-600', B: 'bg-green-500', C: 'bg-lime-500',
    D: 'bg-yellow-500', E: 'bg-orange-500', F: 'bg-red-500', G: 'bg-red-700',
  };
  return colors[rating] || 'bg-slate-500';
};

const PropertyCard = ({ property }) => {
  const { formatPrice } = useCurrency();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={
            property.images && property.images.length > 0
              ? property.images[0]
              : 'https://placehold.co/800x560/e2e8f0/94a3b8?text=Property+Photo'
          }
          alt={property.title}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x560/e2e8f0/94a3b8?text=Property+Photo'; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className="bg-navy-900 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            {property.status}
          </span>
          <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {property.purpose}
          </span>
        </div>
        {property.epcRating && (
          <div className={`absolute bottom-3 left-3 ${getEpcColor(property.epcRating)} text-white px-2.5 py-1 rounded text-xs font-bold shadow-sm border border-white/20`}>
            EPC {property.epcRating}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-navy-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          {formatPrice(property.price)}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-1.5 gap-2">
          <h3 className="text-base font-bold text-navy-900 line-clamp-1 flex-1">{property.title}</h3>
          {property.verified && (
            <div className="flex items-center text-gold-500 shrink-0" title="Verified Listing">
              <CheckCircle className="w-4 h-4 fill-gold-50" />
            </div>
          )}
        </div>

        <div className="flex items-center text-slate-500 mb-4 text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1 text-gold-500 flex-shrink-0" />
          <span className="line-clamp-1">{property.address}</span>
        </div>

        <div className="flex items-center justify-between border-t border-b border-slate-100 py-3 mb-4 mt-auto text-slate-600">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-navy-900" />
            <span className="text-sm font-medium">{property.beds} <span className="text-slate-400 text-xs font-normal">Beds</span></span>
          </div>
          <div className="w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-navy-900" />
            <span className="text-sm font-medium">{property.baths} <span className="text-slate-400 text-xs font-normal">Baths</span></span>
          </div>
          <div className="w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <Square className="h-4 w-4 text-navy-900" />
            <span className="text-sm font-medium">{property.sqft.toLocaleString()} <span className="text-slate-400 text-xs font-normal">sqft</span></span>
          </div>
        </div>

        <Link
          to={`/property/${property._id}`}
          className="w-full block text-center py-2.5 rounded-xl border-2 border-navy-900 text-navy-900 font-bold text-sm hover:bg-navy-900 hover:text-white transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
