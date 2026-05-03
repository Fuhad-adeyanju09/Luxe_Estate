import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import AboutAgent from '../components/AboutAgent';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedListings />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <AboutAgent />
      <ContactSection />
    </main>
  );
};

export default HomePage;
