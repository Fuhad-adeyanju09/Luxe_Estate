import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: 'buying',
    message: ''
  });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message.');
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', interest: 'buying', message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message });
    }
  };

  return (
    <section id="contact" className="py-24 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Information */}
          <div className="lg:w-1/3 text-white">
            <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-3">Get In Touch</h2>
            <h3 className="text-4xl font-bold mb-8">Let's Find Your Perfect Home</h3>
            <p className="text-slate-400 font-light mb-12">
              Ready to begin your luxury real estate journey? Contact our office today to schedule a confidential consultation.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Office Location</h4>
                  <p className="text-slate-400">100 Luxury Avenue, Suite 500<br/>Beverly Hills, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Phone</h4>
                  <p className="text-slate-400">+1 (310) 555-0198<br/>+1 (310) 555-0199</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Email</h4>
                  <p className="text-slate-400">inquiries@luxeestates.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Office Hours</h4>
                  <p className="text-slate-400">Monday - Friday: 9AM - 6PM<br/>Weekend: By Appointment Only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-[100px]"></div>
              
              <h3 className="text-2xl font-bold text-navy-900 mb-8 relative z-10">Send Us A Message</h3>
              
              {status.success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl relative z-10">
                  <span className="block sm:inline">Thank you! Your message has been received. We will contact you shortly.</span>
                </div>
              )}

              {status.error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl relative z-10">
                  <span className="block sm:inline">{status.error}</span>
                </div>
              )}

              <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Interested In</label>
                  <select 
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all text-slate-700 appearance-none"
                  >
                    <option value="buying">Buying a Property</option>
                    <option value="selling">Selling a Property</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                  <textarea 
                    rows="4" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
                    placeholder="How can we assist you?"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={status.submitting}
                  className="w-full bg-navy-900 hover:bg-gold-500 text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-lg shadow-navy-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
