import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Facebook = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const Instagram = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const Twitter = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const Linkedin = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gold-500 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  LUXE <span className="text-gold-500">ESTATES</span>
                </h2>
                <p className="text-xs tracking-widest uppercase text-slate-400">Find Your Home</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              A trusted UK estate agency helping buyers, sellers and renters find the right property across England, Scotland and Wales.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-gold-500 transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-gold-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-gold-500 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-gold-500 transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Home</Link></li>
              <li><Link to="/properties?purpose=For+Sale" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Properties For Sale</Link></li>
              <li><Link to="/properties?purpose=For+Rent" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Properties For Rent</Link></li>
              <li><a href="/#about" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Meet The Agent</a></li>
              <li><a href="/#contact" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Buying a Property</a></li>
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Selling Your Home</a></li>
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Renting a Property</a></li>
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Letting Your Property</a></li>
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Free Valuations</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Property Alerts</h4>
            <p className="text-slate-400 text-sm mb-4">
              Be the first to hear about new listings in your area. Subscribe for weekly property updates.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors pr-24"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-gold-500 hover:bg-gold-600 text-white px-4 rounded-md text-sm font-semibold transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Luxe Estates. All rights reserved. This is a portfolio demonstration site.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Terms of Use</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
