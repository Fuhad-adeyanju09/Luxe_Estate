import React from 'react';
import { Search, Calendar, Key } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "1. Search",
      description: "Browse our exclusive collection of luxury properties and find the one that matches your vision."
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "2. Schedule Viewing",
      description: "Book a private tour with our expert agents to experience the property firsthand."
    },
    {
      icon: <Key className="h-8 w-8 text-white" />,
      title: "3. Move In",
      description: "Complete the seamless transaction process and receive the keys to your new dream home."
    }
  ];

  return (
    <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-3">Simple Process</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h3>
          <p className="text-lg text-slate-300 font-light">
            We've streamlined the luxury home buying experience to make it as effortless and enjoyable as possible.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-700"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-navy-900 border-4 border-slate-700 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-gold-500 transition-colors duration-300 shadow-xl">
                  {step.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                <p className="text-slate-400 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
