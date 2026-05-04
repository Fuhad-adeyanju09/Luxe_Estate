import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah & Mark Thompson",
      role: "Bought a 3-bed semi in Manchester",
      text: "As first-time buyers, we were really nervous about the whole process. The team at Luxe Estates were brilliant — they explained everything clearly, never rushed us, and we got our dream home under our budget. Couldn't recommend them enough.",
      rating: 5
    },
    {
      id: 2,
      name: "David Okonkwo",
      role: "Sold his terrace in Birmingham",
      text: "I had my house on the market for months with another agent and got nowhere. Luxe Estates got me three viewings in the first week and an offer above asking price within a fortnight. Brilliant service from start to finish.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Clarke",
      role: "Renting a flat in Leeds",
      text: "Found my flat through Luxe Estates and the whole process was smooth and straightforward. The agent was really helpful and honest — no pushy sales tactics at all. I'd definitely use them again when I'm ready to buy.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-3">Happy Customers</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">What Our Clients Say</h3>
          <p className="text-lg text-slate-600">Real stories from real people we've helped move.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col relative">
              <div className="absolute top-6 right-6 text-6xl text-slate-100 font-serif leading-none select-none">"</div>

              <div className="flex items-center gap-1 mb-6 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
                ))}
              </div>

              <p className="text-slate-600 text-base italic mb-8 flex-1 relative z-10 leading-relaxed">
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
