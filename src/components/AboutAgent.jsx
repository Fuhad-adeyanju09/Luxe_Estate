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
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="James Hargreaves - Estate Agent"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x1000/1e293b/ffffff?text=Agent+Photo'; }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-gold-500 font-bold uppercase tracking-wider text-sm mb-1">Director & Lead Agent</p>
              <h3 className="text-3xl font-bold">James Hargreaves</h3>
            </div>
          </div>

          {/* Agent Content */}
          <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-3">Meet The Agent</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Helping Families Find Their Perfect Home
            </h3>

            <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
              <p>
                With over 12 years of experience in the UK property market, James Hargreaves has helped hundreds of families and first-time buyers find the right home at the right price — from flats in Manchester to family homes in the Surrey hills.
              </p>
              <p>
                Our approach is straightforward: honest advice, zero pressure, and genuine support throughout the buying or selling process. We believe everyone deserves a smooth move.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <span className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-navy-900 shadow-sm">12+ Years Experience</span>
              <span className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-navy-900 shadow-sm">£1B+ in Sales</span>
              <span className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-navy-900 shadow-sm">500+ Happy Buyers</span>
            </div>

            {/* Social & Contact */}
            <div className="flex items-center gap-6 pt-6 border-t border-slate-200 flex-wrap">
              <div className="flex gap-3">
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-4 flex-wrap">
                <a href="tel:+442077009100" className="text-slate-600 hover:text-gold-500 transition-colors flex items-center gap-2 font-medium text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+44 20 7700 9100</span>
                </a>
                <a href="mailto:james@luxeestates.co.uk" className="text-slate-600 hover:text-gold-500 transition-colors flex items-center gap-2 font-medium text-sm">
                  <Mail className="h-4 w-4" />
                  <span className="hidden sm:inline">james@luxeestates.co.uk</span>
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
