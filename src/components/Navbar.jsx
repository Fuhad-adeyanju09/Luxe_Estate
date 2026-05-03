import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // If not on home page, make navbar solid
  const isHomePage = location.pathname === '/';
  const navbarScrolled = scrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'For Sale', href: '/properties?purpose=For+Sale' },
    { name: 'For Rent', href: '/properties?purpose=For+Rent' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-navy-900 rounded-lg group-hover:bg-gold-500 transition-colors">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold tracking-tight ${navbarScrolled ? 'text-navy-900' : 'text-white'}`}>
                  LUXE <span className="text-gold-500">ESTATES</span>
                </h1>
                <p className={`text-xs tracking-widest uppercase ${navbarScrolled ? 'text-slate-500' : 'text-slate-300'}`}>
                  Premium Realty
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors hover:text-gold-500 ${navbarScrolled ? 'text-slate-700' : 'text-white/90'}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/#contact"
              className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gold-500/30"
            >
              Book a Viewing
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${navbarScrolled ? 'text-navy-900' : 'text-white'} hover:text-gold-500 focus:outline-none`}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-slate-800 hover:text-gold-500 hover:bg-slate-50 rounded-md"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 pb-2">
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-navy-900 text-white px-5 py-3 rounded-md font-semibold hover:bg-gold-500 transition-colors"
              >
                Book a Viewing
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
