import React from 'react';
import { Home, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gold-500 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  LUXE <span className="text-gold-500">ESTATES</span>
                </h1>
                <p className="text-xs tracking-widest uppercase text-slate-400">
                  Premium Realty
                </p>
              </div>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Curating exceptional living experiences for discerning individuals through a portfolio of the world's most luxurious properties.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Home</a></li>
              <li><a href="#listings" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Featured Properties</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Meet The Agent</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Market Reports</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Buying</a></li>
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Selling</a></li>
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Property Management</a></li>
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Appraisals</a></li>
              <li><a href="#" className="text-slate-400 hover:text-gold-500 transition-colors text-sm">Consulting</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to receive exclusive off-market listings and luxury market insights.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
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
            &copy; {new Date().getFullYear()} Luxe Estates. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
