import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import Logo from './Logo';
import { useCurrency } from '../contexts/CurrencyContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currencyRef = useRef(null);
  const { currency, currencies, selectedCurrency, setSelectedCurrency } = useCurrency();

  const isHomePage = location.pathname === '/';
  const navbarScrolled = scrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close currency dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle hash anchor navigation (e.g. /#about, /#contact)
  const handleHashNav = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const sectionId = href.replace('/#', '');
      setIsOpen(false);

      const scrollToSection = () => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      if (location.pathname === '/') {
        scrollToSection();
      } else {
        navigate('/');
        // Wait for the page to render then scroll
        setTimeout(scrollToSection, 350);
      }
    } else {
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'For Sale', href: '/properties?purpose=For+Sale' },
    { name: 'For Rent', href: '/properties?purpose=For+Rent' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  const textColor = navbarScrolled ? 'text-slate-700' : 'text-white/90';
  const logoTextColor = navbarScrolled ? 'text-navy-900' : 'text-white';
  const logoSubColor = navbarScrolled ? 'text-slate-500' : 'text-slate-300';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-navy-900 rounded-lg group-hover:bg-gold-500 transition-colors flex items-center justify-center">
              <Logo className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className={`text-lg font-bold tracking-tight ${logoTextColor}`}>
                LUXE <span className="text-gold-500">ESTATES</span>
              </p>
              <p className={`text-xs tracking-widest uppercase ${logoSubColor}`}>
                Find Your Home
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleHashNav(e, link.href)}
                  className={`font-medium transition-colors hover:text-gold-500 text-sm cursor-pointer ${textColor}`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium transition-colors hover:text-gold-500 text-sm ${textColor}`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Right side: Currency + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="relative" ref={currencyRef}>
              <button
                id="currency-switcher"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-xl transition-all ${navbarScrolled ? 'text-slate-700 bg-slate-100 hover:bg-slate-200' : 'text-white bg-white/10 hover:bg-white/20'}`}
              >
                <Globe className="w-3.5 h-3.5" />
                {currency.symbol} {selectedCurrency}
                <ChevronDown className={`w-3 h-3 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>

              {currencyOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden z-50">
                  {Object.values(currencies).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setSelectedCurrency(c.code); setCurrencyOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 transition-colors ${selectedCurrency === c.code ? 'text-gold-500 font-bold bg-gold-50' : 'text-slate-700'}`}
                    >
                      <span>{c.symbol} {c.code}</span>
                      <span className="text-slate-400 text-xs">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/#contact"
              onClick={(e) => handleHashNav(e, '/#contact')}
              className="bg-gold-500 hover:bg-gold-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gold-500/30 cursor-pointer"
            >
              Book a Viewing
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Currency */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-2 rounded-lg ${navbarScrolled ? 'text-slate-700 bg-slate-100' : 'text-white bg-white/10'}`}
              >
                <Globe className="w-3 h-3" />
                {selectedCurrency}
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden z-50">
                  {Object.values(currencies).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setSelectedCurrency(c.code); setCurrencyOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 ${selectedCurrency === c.code ? 'text-gold-500 font-bold' : 'text-slate-700'}`}
                    >
                      <span>{c.symbol} {c.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${navbarScrolled ? 'text-navy-900' : 'text-white'} hover:text-gold-500 focus:outline-none`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleHashNav(e, link.href)}
                  className="block px-3 py-3 text-base font-medium text-slate-800 hover:text-gold-500 hover:bg-slate-50 rounded-md cursor-pointer"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-slate-800 hover:text-gold-500 hover:bg-slate-50 rounded-md"
                >
                  {link.name}
                </Link>
              )
            ))}
            <div className="pt-4 pb-2">
              <a
                href="/#contact"
                onClick={(e) => handleHashNav(e, '/#contact')}
                className="block w-full text-center bg-gold-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-gold-600 transition-colors cursor-pointer"
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
