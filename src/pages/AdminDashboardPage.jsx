import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Home, MessageSquare, PlusCircle, Trash2, CheckCircle,
  LogOut, LayoutDashboard, BarChart3, X
} from 'lucide-react';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [properties, setProperties] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    title: '', address: '', price: '', beds: '', baths: '', sqft: '',
    status: 'Available', purpose: 'For Sale',
    propertyType: 'semi-detached',
    description: '', images: '',
    sellerName: '', sellerPhone: '', sellerEmail: '',
    epcRating: 'C',
  });

  const token = localStorage.getItem('admin_token');

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    try {
      const pRes = await fetch('/api/properties');
      const pData = await pRes.json();
      setProperties(pData);

      const cRes = await fetch('/api/contacts', { headers: authHeaders });
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

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      if (!res.ok) throw new Error('Unauthorised or failed');
      showToast('Property deleted.');
      fetchData();
    } catch (err) {
      showToast('Failed to delete. Please log in again.', 'error');
    }
  };

  const handleUpdateContactStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/contacts/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ status: newStatus }),
      });
      fetchData();
    } catch (err) {
      showToast('Failed to update status.', 'error');
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const newProp = {
      title: formData.title,
      address: formData.address,
      price: Number(formData.price),
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      sqft: Number(formData.sqft),
      status: formData.status,
      purpose: formData.purpose,
      propertyType: formData.propertyType,
      description: formData.description,
      epcRating: formData.epcRating,
      images: formData.images.split(',').map((s) => s.trim()).filter((s) => s),
      seller: {
        name: formData.sellerName,
        phone: formData.sellerPhone,
        email: formData.sellerEmail,
      },
    };

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newProp),
      });
      if (!res.ok) throw new Error('Unauthorised or failed');
      showToast('Property added successfully!');
      setFormData({
        title: '', address: '', price: '', beds: '', baths: '', sqft: '',
        status: 'Available', purpose: 'For Sale', propertyType: 'semi-detached',
        description: '', images: '', sellerName: '', sellerPhone: '',
        sellerEmail: '', epcRating: 'C',
      });
      fetchData();
      setActiveTab('listings');
    } catch (err) {
      showToast('Error adding property. Check your session.', 'error');
    }
  };

  const handleVerifyProperty = async (id) => {
    try {
      const res = await fetch(`/api/properties/${id}/verify`, {
        method: 'PATCH',
        headers: authHeaders,
      });
      if (!res.ok) throw new Error('Unauthorised');
      showToast('Property verified!');
      fetchData();
    } catch (err) {
      showToast('Failed to verify.', 'error');
    }
  };

  const navItems = [
    { id: 'listings', label: 'Listings', icon: Home },
    { id: 'inquiries', label: 'Enquiries', icon: MessageSquare },
    { id: 'add', label: 'Add Property', icon: PlusCircle },
  ];

  const stats = [
    { label: 'Total Properties', value: properties.length, icon: Home },
    { label: 'For Sale', value: properties.filter(p => p.purpose === 'For Sale').length, icon: BarChart3 },
    { label: 'For Rent', value: properties.filter(p => p.purpose === 'For Rent').length, icon: BarChart3 },
    { label: 'Enquiries', value: contacts.length, icon: MessageSquare },
  ];

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white transition-all text-slate-800";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800">
          <div className="p-2 bg-gold-500 rounded-lg">
            <Home className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">LUXE ESTATES</p>
            <p className="text-xs text-slate-400 tracking-wider uppercase">Admin Panel</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <p className="text-xs uppercase tracking-widest text-slate-500 px-3 mb-4 font-semibold">Management</p>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === id
                ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            <LayoutDashboard className="w-4 h-4" />
            View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-black/50 lg:hidden" />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-navy-900">
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-navy-900">
              {activeTab === 'listings' ? 'All Listings' : activeTab === 'inquiries' ? 'Enquiries' : 'Add Property'}
            </h1>
            <p className="text-sm text-slate-400">Luxe Estates Admin Dashboard</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-500">Admin</span>
            <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
          </div>
        </header>

        {/* Toast */}
        {toast && (
          <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-medium flex items-center gap-2 transition-all ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            <CheckCircle className="w-4 h-4" />
            {toast.msg}
          </div>
        )}

        <main className="flex-1 p-6 overflow-auto">
          {/* Stats Row */}
          {activeTab === 'listings' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <stat.icon className="w-5 h-5 text-gold-500 mb-3" />
                  <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[500px]">

            {/* LISTINGS TAB */}
            {activeTab === 'listings' && (
              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-6">All Properties ({properties.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                        <th className="pb-3 px-3">Property</th>
                        <th className="pb-3 px-3">Price</th>
                        <th className="pb-3 px-3">Type</th>
                        <th className="pb-3 px-3">Purpose</th>
                        <th className="pb-3 px-3">Verified</th>
                        <th className="pb-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((p) => (
                        <tr key={p._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-semibold text-navy-900 text-sm line-clamp-1">{p.title}</div>
                            <div className="text-xs text-slate-400 line-clamp-1">{p.address}</div>
                          </td>
                          <td className="py-3 px-3 font-semibold text-navy-900">£{p.price.toLocaleString()}</td>
                          <td className="py-3 px-3 capitalize text-sm text-slate-600">{p.propertyType}</td>
                          <td className="py-3 px-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.purpose === 'For Sale' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                              {p.purpose}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            {p.verified ? (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Verified</span>
                            ) : (
                              <button
                                onClick={() => handleVerifyProperty(p._id)}
                                className="text-gold-500 hover:text-gold-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                              >
                                <CheckCircle className="w-3.5 h-3.5" /> Verify
                              </button>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => handleDeleteProperty(p._id)}
                              className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {properties.length === 0 && (
                        <tr><td colSpan="6" className="py-12 text-center text-slate-400 text-sm">No properties found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ENQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-6">Enquiries ({contacts.length})</h2>
                <div className="space-y-4">
                  {contacts.map((c) => (
                    <div key={c._id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-navy-900">{c.firstName} {c.lastName}</h3>
                        <div className="text-sm text-slate-500 space-y-0.5 mt-1">
                          <p>{c.email} {c.phone && `• ${c.phone}`}</p>
                          <p>Interest: <span className="font-medium text-navy-900 capitalize">{c.interest}</span></p>
                          <p>Date: {new Date(c.createdAt).toLocaleDateString('en-GB')}</p>
                        </div>
                        <p className="mt-3 text-slate-700 text-sm italic border-l-2 border-gold-500 pl-3">{c.message}</p>
                      </div>
                      <div className="flex items-start">
                        <select
                          value={c.status || 'new'}
                          onChange={(e) => handleUpdateContactStatus(c._id, e.target.value)}
                          className={`px-3 py-2 rounded-lg font-bold text-xs border focus:outline-none focus:ring-2 focus:ring-gold-500 ${c.status === 'closed' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                            c.status === 'contacted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-green-50 text-green-700 border-green-200'}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <p className="text-center text-slate-400 py-12 text-sm">No enquiries yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* ADD PROPERTY TAB */}
            {activeTab === 'add' && (
              <div>
                <h2 className="text-lg font-bold text-navy-900 mb-6">Add New Property</h2>
                <form onSubmit={handleAddProperty} className="max-w-3xl space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Property Title</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="e.g. 3-Bed Semi in Manchester" />
                    </div>
                    <div>
                      <label className={labelClass}>Full Address</label>
                      <input required type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className={inputClass} placeholder="e.g. 42 Park Road, Manchester, M14 5AB" />
                    </div>
                    <div>
                      <label className={labelClass}>Price (£)</label>
                      <input required type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className={inputClass} placeholder="e.g. 285000" />
                    </div>
                    <div>
                      <label className={labelClass}>Property Type</label>
                      <select value={formData.propertyType} onChange={e => setFormData({ ...formData, propertyType: e.target.value })} className={inputClass}>
                        <option value="terraced">Terraced House</option>
                        <option value="semi-detached">Semi-Detached House</option>
                        <option value="detached">Detached House</option>
                        <option value="flat">Flat / Apartment</option>
                        <option value="bungalow">Bungalow</option>
                        <option value="cottage">Cottage</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Purpose</label>
                      <select value={formData.purpose} onChange={e => setFormData({ ...formData, purpose: e.target.value })} className={inputClass}>
                        <option value="For Sale">For Sale</option>
                        <option value="For Rent">For Rent</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Listing Status</label>
                      <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className={inputClass}>
                        <option value="Available">Available</option>
                        <option value="New Listing">New Listing</option>
                        <option value="Under Offer">Under Offer</option>
                        <option value="Sold">Sold</option>
                        <option value="Let Agreed">Let Agreed</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>EPC Rating</label>
                      <select value={formData.epcRating} onChange={e => setFormData({ ...formData, epcRating: e.target.value })} className={inputClass}>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(r => <option key={r} value={r}>EPC {r}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-5">
                    <div>
                      <label className={labelClass}>Bedrooms</label>
                      <input required type="number" min="0" value={formData.beds} onChange={e => setFormData({ ...formData, beds: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Bathrooms</label>
                      <input required type="number" min="1" value={formData.baths} onChange={e => setFormData({ ...formData, baths: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Sq Ft</label>
                      <input required type="number" min="1" value={formData.sqft} onChange={e => setFormData({ ...formData, sqft: e.target.value })} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className={inputClass + ' resize-none'} placeholder="Describe the property..." />
                  </div>

                  <div>
                    <label className={labelClass}>Image URLs (comma separated)</label>
                    <input type="text" value={formData.images} onChange={e => setFormData({ ...formData, images: e.target.value })} className={inputClass} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <p className="text-sm font-semibold text-slate-700 mb-4">Agent / Seller Details</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className={labelClass}>Name</label>
                        <input required type="text" value={formData.sellerName} onChange={e => setFormData({ ...formData, sellerName: e.target.value })} className={inputClass} placeholder="Jane Smith" />
                      </div>
                      <div>
                        <label className={labelClass}>Phone</label>
                        <input required type="text" value={formData.sellerPhone} onChange={e => setFormData({ ...formData, sellerPhone: e.target.value })} className={inputClass} placeholder="+44 20 7946 0100" />
                      </div>
                      <div>
                        <label className={labelClass}>Email</label>
                        <input required type="email" value={formData.sellerEmail} onChange={e => setFormData({ ...formData, sellerEmail: e.target.value })} className={inputClass} placeholder="agent@luxeestates.co.uk" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="bg-navy-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-gold-500 transition-colors shadow-lg">
                    Save Property
                  </button>
                </form>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
