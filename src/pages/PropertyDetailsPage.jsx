import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowLeft, Phone, Mail, User, MessageCircle, CheckCircle } from 'lucide-react';
import MortgageCalculator from '../components/MortgageCalculator';
import { useCurrency } from '../contexts/CurrencyContext';

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

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`);
        if (!response.ok) {
          throw new Error('Property not found');
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-2xl text-red-500 font-semibold mb-4">Error: {error}</p>
        <Link to="/properties" className="text-gold-500 hover:underline">Return to properties</Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 
    ? property.images 
    : [property.image || 'https://placehold.co/800x600/0f172a/ffffff?text=NO+IMAGE'];

  return (
    <div className="bg-slate-50 pb-24 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/properties" className="inline-flex items-center text-slate-500 hover:text-navy-900 transition-colors mb-8 font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to listings
        </Link>

        {/* Header & Image Gallery */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 mb-10 p-6">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-4">
            <img src={images[activeImage]} alt={property.title} 
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x500/e2e8f0/94a3b8?text=Property+Photo'; }}
                className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6 flex gap-2">
              <div className="bg-navy-900 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide shadow-md">
                {property.status}
              </div>
              <div className="bg-gold-500 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide shadow-md">
                {property.purpose}
              </div>
            </div>
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-navy-900 px-5 py-2 rounded-full text-lg font-bold shadow-sm">
              {formatPrice(property.price)}
            </div>
          </div>
          
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-32 h-24 rounded-xl overflow-hidden border-4 transition-all duration-300 ${activeImage === index ? 'border-gold-500 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Photo ${index + 1}`}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x150/e2e8f0/94a3b8?text=Photo'; }}
                    className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          
          <div className="pt-8 mt-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 text-gold-500 font-semibold tracking-wider text-sm uppercase mb-3">
                <span className="bg-gold-500/10 px-3 py-1 rounded-full">{property.propertyType}</span>
                {property.epcRating && (
                  <span className={`${getEpcColor(property.epcRating)} text-white px-3 py-1 rounded shadow-sm border border-black/10`}>EPC {property.epcRating}</span>
                )}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-5xl font-bold text-navy-900">{property.title}</h1>
                {property.verified && (
                  <div className="flex items-center text-gold-500" title="Verified Listing">
                    <CheckCircle className="w-8 h-8 fill-gold-50" />
                  </div>
                )}
              </div>
              <div className="flex items-center text-slate-500 text-lg">
                <MapPin className="h-5 w-5 mr-2 text-gold-500" />
                {property.address}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Stats */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap gap-8 justify-around">
              <div className="text-center">
                <div className="w-14 h-14 bg-navy-900/5 text-navy-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bed className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-navy-900">{property.beds}</div>
                <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-navy-900/5 text-navy-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bath className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-navy-900">{property.baths}</div>
                <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-navy-900/5 text-navy-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Square className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-navy-900">{property.sqft.toLocaleString()}</div>
                <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">Square Feet</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">About this Property</h3>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                {property.description}
              </p>
            </div>

            {/* Neighbourhood Map */}
            {property.coordinates && property.coordinates.lat && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-10">
                <h3 className="text-2xl font-bold text-navy-900 mb-6">Neighbourhood</h3>
                <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-6 bg-slate-100">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight="0" 
                    marginWidth="0" 
                    src={`https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&output=embed`}
                  ></iframe>
                </div>
                {property.nearbyPoints && property.nearbyPoints.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-3">Nearby Points of Interest:</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.nearbyPoints.map((point, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <MortgageCalculator propertyPrice={property.price} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Price Summary (UK-specific) */}
            <div className="bg-navy-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px]" />
              <h3 className="text-xl font-bold mb-6">Price Summary</h3>

              <div className="space-y-4 mb-6 relative z-10">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Asking Price</span>
                  <span>{formatPrice(property.price)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Est. Conveyancing</span>
                  <span>{formatPrice(1800)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Survey (Level 2)</span>
                  <span>{formatPrice(500)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Land Registry Fee</span>
                  <span>{formatPrice(305)}</span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6 mt-6 flex justify-between items-center relative z-10">
                <span className="text-base font-bold">Est. Total Cost</span>
                <span className="text-2xl font-bold text-gold-500">{formatPrice(property.price + 2605)}</span>
              </div>
              <p className="text-xs text-slate-500 mt-3 relative z-10">Stamp Duty calculated separately below. All estimates only.</p>
            </div>

            {/* Seller Contact */}
            {property.seller && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
                <h3 className="text-xl font-bold text-navy-900 mb-6">Listed By</h3>
                
                <div className="mb-6">
                  {property.seller.avatar ? (
                    <img src={property.seller.avatar} alt={property.seller.name} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-slate-50 shadow-md" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto flex items-center justify-center">
                      <User className="h-10 w-10 text-slate-400" />
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-navy-900 mt-4">{property.seller.name}</h4>
                  <p className="text-slate-500 text-sm">Luxury Real Estate Agent</p>
                </div>

                <div className="space-y-3 mb-8 text-left bg-slate-50 p-4 rounded-xl">
                  <a href={`tel:${property.seller.phone}`} className="flex items-center text-slate-600 hover:text-navy-900 transition-colors">
                    <Phone className="h-4 w-4 mr-3 text-gold-500" />
                    {property.seller.phone}
                  </a>
                  <a href={`mailto:${property.seller.email}`} className="flex items-center text-slate-600 hover:text-navy-900 transition-colors">
                    <Mail className="h-4 w-4 mr-3 text-gold-500" />
                    {property.seller.email}
                  </a>
                </div>

                <div className="space-y-3">
                  <a href={`tel:${property.seller.phone}`} className="w-full bg-navy-900 hover:bg-navy-800 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center transition-colors duration-300 shadow-lg shadow-navy-900/20">
                    <Phone className="h-5 w-5 mr-2" /> Call Agent
                  </a>
                  
                  <a 
                    href={`https://wa.me/${property.seller.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center transition-colors duration-300 shadow-lg shadow-green-500/20"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" /> WhatsApp
                  </a>
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailsPage;
