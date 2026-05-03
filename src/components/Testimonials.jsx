import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Eleanor & James Wentworth",
      role: "Purchased a Malibu Estate",
      text: "The level of service we received was simply extraordinary. Their deep knowledge of the luxury market and skilled negotiation saved us millions. They found us our dream home before it even hit the market.",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Sold a Manhattan Penthouse",
      text: "Professionalism at its finest. From the stunning marketing materials to the global network of buyers they brought in, my penthouse sold in record time for above asking price. Highly recommended.",
      rating: 5
    },
    {
      id: 3,
      name: "Sarah Sterling",
      role: "Purchased a Country Estate",
      text: "Moving across the country is stressful, but this team made it seamless. They handled every detail with utmost discretion and care. I couldn't be happier with my new estate.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-3">Client Success</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">What Our Clients Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col relative">
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-6 text-6xl text-slate-100 font-serif leading-none select-none">
                "
              </div>
              
              <div className="flex items-center gap-1 mb-6 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              
              <p className="text-slate-600 text-lg italic mb-8 flex-1 relative z-10 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="border-t border-slate-100 pt-6 mt-auto">
                <h4 className="text-lg font-bold text-navy-900">{review.name}</h4>
                <p className="text-gold-600 text-sm font-medium">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
