import React from 'react';
import { Award, Users, ShieldCheck, Map } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award className="h-10 w-10 text-gold-500" />,
      title: "12+ Years Experience",
      description: "Over a decade helping buyers, sellers and renters navigate the UK property market with confidence and clarity."
    },
    {
      icon: <Users className="h-10 w-10 text-gold-500" />,
      title: "500+ Happy Movers",
      description: "From first-time buyers to growing families, we've helped hundreds of people find the right home at the right price."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-gold-500" />,
      title: "Transparent & Honest",
      description: "We believe in full transparency throughout the buying and selling process — no hidden fees, no pressure, just honest advice."
    },
    {
      icon: <Map className="h-10 w-10 text-gold-500" />,
      title: "UK-Wide Coverage",
      description: "From London to Edinburgh, we have local knowledge across the UK to help you find the right property in the right area."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-3">Why Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">
              Why Choose Luxe Estates?
            </h3>
            <p className="text-lg text-slate-600 mb-8 font-light">
              We believe finding a home should be straightforward and stress-free. Our experienced team is here to support you through every step — with honest advice, no hidden fees, and genuine care.
            </p>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1582407947304-fd86f28f4b79?w=800&q=80"
                alt="UK Street of Houses"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/e2e8f0/94a3b8?text=Houses'; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy-900/20" />
            </div>
          </div>

          {/* Right Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-navy-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
