import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Instagram = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const Twitter = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const Linkedin = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

const AboutAgent = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row">
          
          {/* Agent Image */}
          <div className="md:w-2/5 relative h-96 md:h-auto">
            <img 
              src="https://placehold.co/800x1000/0f172a/ffffff?text=Agent+Portrait" 
              alt="Agent Portrait" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-gold-500 font-bold uppercase tracking-wider text-sm mb-1">Founder & Lead Broker</p>
              <h3 className="text-3xl font-bold">Alexander Sterling</h3>
            </div>
          </div>

          {/* Agent Content */}
          <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-3">About The Agent</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Defining Luxury Real Estate Excellence
            </h3>
            
            <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
              <p>
                With over 15 years of dedicated experience in the ultra-luxury market, Alexander Sterling has established himself as the premier broker for high-net-worth individuals, celebrities, and executives seeking exceptional properties.
              </p>
              <p>
                His unmatched negotiation skills, rigorous attention to detail, and extensive global network ensure that his clients receive an unparalleled level of service and access to off-market gems.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <span className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-navy-900 shadow-sm">Top 1% Nationwide</span>
              <span className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-navy-900 shadow-sm">$1B+ Career Sales</span>
              <span className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-navy-900 shadow-sm">Certified Luxury Specialist</span>
            </div>

            {/* Social & Contact */}
            <div className="flex items-center gap-6 pt-6 border-t border-slate-200">
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex items-center gap-4">
                <a href="tel:+1234567890" className="text-slate-600 hover:text-gold-500 transition-colors flex items-center gap-2 font-medium">
                  <Phone className="h-5 w-5" />
                  <span className="hidden sm:inline">(555) 123-4567</span>
                </a>
                <a href="mailto:alex@luxeestates.com" className="text-slate-600 hover:text-gold-500 transition-colors flex items-center gap-2 font-medium">
                  <Mail className="h-5 w-5" />
                  <span className="hidden sm:inline">alex@luxeestates.com</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAgent;
