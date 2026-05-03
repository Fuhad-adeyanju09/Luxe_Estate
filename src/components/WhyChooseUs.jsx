import React from 'react';
import { Award, Users, ShieldCheck, Map } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award className="h-10 w-10 text-gold-500" />,
      title: "10+ Years Experience",
      description: "A decade of excellence in the luxury real estate market, providing unparalleled expertise and insight."
    },
    {
      icon: <Users className="h-10 w-10 text-gold-500" />,
      title: "500+ Homes Sold",
      description: "A proven track record of successfully matching discerning clients with their perfect properties."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-gold-500" />,
      title: "Trusted by Families",
      description: "Building lasting relationships through transparency, integrity, and exceptional service."
    },
    {
      icon: <Map className="h-10 w-10 text-gold-500" />,
      title: "Local Market Expert",
      description: "Deep understanding of exclusive neighborhoods, market trends, and hidden property gems."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-3">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">
              Why Choose Luxe Estates?
            </h3>
            <p className="text-lg text-slate-600 mb-8 font-light">
              We don't just sell houses; we curate lifestyles. Our dedicated team of seasoned professionals is committed to delivering a seamless, confidential, and highly personalized real estate experience.
            </p>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://placehold.co/800x600/0f172a/ffffff?text=Luxury+Interior" 
                alt="Luxury Interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy-900/20"></div>
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
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
