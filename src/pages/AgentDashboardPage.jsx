import React, { useState, useEffect } from 'react';
import { Home, MessageSquare, PlusCircle, Trash2, CheckCircle } from 'lucide-react';

const AgentDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('listings'); // listings, inquiries, add
  const [properties, setProperties] = useState([]);
  const [contacts, setContacts] = useState([]);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '', address: '', price: '', beds: '', baths: '', sqft: '', 
    status: 'Just Listed', purpose: 'For Sale', propertyType: 'house', 
    description: '', images: '', // comma separated list
    sellerName: 'Agent Name', sellerPhone: '555-0000', sellerEmail: 'agent@luxe.com'
  });

  const fetchData = async () => {
    try {
      const pRes = await fetch('/api/properties');
      const pData = await pRes.json();
      setProperties(pData);
      
      const cRes = await fetch('/api/contacts');
      if (cRes.ok) {
        const cData = await cRes.json();
        setContacts(cData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProperty = async (id) => {
    if(!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      fetchData();
    } catch(err) {
      console.error(err);
    }
  };

  const handleUpdateContactStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/contacts/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchData();
    } catch(err) {
      console.error(err);
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const newProp = {
      title: formData.title, address: formData.address, price: Number(formData.price),
      beds: Number(formData.beds), baths: Number(formData.baths), sqft: Number(formData.sqft),
      status: formData.status, purpose: formData.purpose, propertyType: formData.propertyType,
      description: formData.description,
      images: formData.images.split(',').map(s => s.trim()).filter(s => s),
      seller: { name: formData.sellerName, phone: formData.sellerPhone, email: formData.sellerEmail }
    };

    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProp)
      });
      alert('Property added successfully!');
      fetchData();
      setActiveTab('listings');
    } catch(err) {
      console.error(err);
      alert('Error adding property');
    }
  };

  const handleVerifyProperty = async (id) => {
    try {
      await fetch(`/api/properties/${id}/verify`, { method: 'PATCH' });
      fetchData();
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900">Agent Dashboard</h1>
          <p className="text-slate-500 mt-2">Manage your listings, view inquiries, and add new properties.</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-slate-200 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('listings')}
            className={`flex items-center pb-4 px-2 border-b-2 font-medium transition-colors flex-shrink-0 ${activeTab === 'listings' ? 'border-gold-500 text-gold-500' : 'border-transparent text-slate-500 hover:text-navy-900'}`}
          >
            <Home className="w-5 h-5 mr-2" /> My Listings
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center pb-4 px-2 border-b-2 font-medium transition-colors flex-shrink-0 ${activeTab === 'inquiries' ? 'border-gold-500 text-gold-500' : 'border-transparent text-slate-500 hover:text-navy-900'}`}
          >
            <MessageSquare className="w-5 h-5 mr-2" /> Inquiries
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className={`flex items-center pb-4 px-2 border-b-2 font-medium transition-colors flex-shrink-0 ${activeTab === 'add' ? 'border-gold-500 text-gold-500' : 'border-transparent text-slate-500 hover:text-navy-900'}`}
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Add Property
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-8 min-h-[500px]">
          
          {activeTab === 'listings' && (
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-6">Active Listings ({properties.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                      <th className="pb-3 px-4">Property</th>
                      <th className="pb-3 px-4">Price</th>
                      <th className="pb-3 px-4">Type</th>
                      <th className="pb-3 px-4">Verified</th>
                      <th className="pb-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map(p => (
                      <tr key={p._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4 font-medium text-navy-900 line-clamp-1">{p.title}</td>
                        <td className="py-4 px-4">£{p.price.toLocaleString()}</td>
                        <td className="py-4 px-4 capitalize">{p.propertyType}</td>
                        <td className="py-4 px-4">
                          {p.verified ? (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Yes</span>
                          ) : (
                            <button onClick={() => handleVerifyProperty(p._id)} className="text-gold-500 hover:text-gold-600 text-xs font-bold uppercase tracking-wider flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" /> Verify
                            </button>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button onClick={() => handleDeleteProperty(p._id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {properties.length === 0 && (
                      <tr><td colSpan="5" className="py-8 text-center text-slate-500">No properties found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-6">Recent Inquiries ({contacts.length})</h2>
              <div className="space-y-4">
                {contacts.map(c => (
                  <div key={c._id} className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-navy-900 text-lg">{c.firstName} {c.lastName}</h3>
                      <div className="text-sm text-slate-500 space-y-1 mt-1">
                        <p>Email: {c.email} {c.phone && `| Phone: ${c.phone}`}</p>
                        <p>Interest: <span className="font-medium text-navy-900">{c.interest}</span></p>
                        <p>Date: {new Date(c.createdAt).toLocaleDateString()}</p>
                      </div>
                      <p className="mt-4 text-slate-700 italic border-l-2 border-gold-500 pl-4">{c.message}</p>
                    </div>
                    <div className="flex items-start">
                      <select 
                        value={c.status || 'new'} 
                        onChange={(e) => handleUpdateContactStatus(c._id, e.target.value)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm border focus:outline-none focus:ring-2 focus:ring-gold-500
                          ${c.status === 'closed' ? 'bg-slate-100 text-slate-500 border-slate-200' : 
                            c.status === 'contacted' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                            'bg-green-50 text-green-700 border-green-200'}
                        `}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                ))}
                {contacts.length === 0 && <p className="text-center text-slate-500 py-8">No inquiries yet.</p>}
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-6">Add New Property</h2>
              <form onSubmit={handleAddProperty} className="max-w-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input required type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <input required type="text" value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (£)</label>
                    <input required type="number" value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
                    <select value={formData.propertyType} onChange={e=>setFormData({...formData, propertyType: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none">
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="penthouse">Penthouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Purpose</label>
                    <select value={formData.purpose} onChange={e=>setFormData({...formData, purpose: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none">
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <input required type="text" value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Beds</label>
                    <input required type="number" value={formData.beds} onChange={e=>setFormData({...formData, beds: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Baths</label>
                    <input required type="number" value={formData.baths} onChange={e=>setFormData({...formData, baths: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Sqft</label>
                    <input required type="number" value={formData.sqft} onChange={e=>setFormData({...formData, sqft: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea rows="4" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Image URLs (comma separated)</label>
                  <input type="text" value={formData.images} onChange={e=>setFormData({...formData, images: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none" placeholder="https://image1.jpg, https://image2.jpg" />
                </div>

                <button type="submit" className="bg-navy-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-gold-500 transition-colors">
                  Save Property
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AgentDashboardPage;
