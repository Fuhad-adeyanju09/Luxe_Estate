import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Property from './models/Property.js';
import Contact from './models/Contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  /\.vercel\.app$/,
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some((o) =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    callback(null, allowed ? origin : false);
  },
  credentials: true,
}));
app.use(express.json());

// ─────────────────────────────────────────────
// MOCK DATA GENERATOR (inline — no extra file)
// ─────────────────────────────────────────────
const _propertyTypes = ['terraced', 'semi-detached', 'detached', 'flat', 'bungalow'];
const _cities = [
  { city: 'London', postcode: 'E1' }, { city: 'Manchester', postcode: 'M14' },
  { city: 'Birmingham', postcode: 'B15' }, { city: 'Leeds', postcode: 'LS6' },
  { city: 'Bristol', postcode: 'BS8' }, { city: 'Sheffield', postcode: 'S10' },
  { city: 'Liverpool', postcode: 'L15' }, { city: 'Nottingham', postcode: 'NG7' },
  { city: 'Oxford', postcode: 'OX2' }, { city: 'Cambridge', postcode: 'CB4' },
  { city: 'Edinburgh', postcode: 'EH3' }, { city: 'Cardiff', postcode: 'CF14' },
];
const _streets = [
  'High Street', 'Park Road', 'Victoria Road', 'Church Lane', 'Station Road',
  'Mill Lane', 'King Street', 'Manor Way', 'The Green', 'Elm Avenue',
  'Maple Drive', 'Cedar Close', 'Birch Way', 'Rosewood Avenue', 'Oak Tree Road',
];
const _sellers = [
  { name: 'James Hargreaves', phone: '+44 20 7946 0100', email: 'james@luxeestates.co.uk', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  { name: 'Emma Clarke',      phone: '+44 20 7946 0101', email: 'emma@luxeestates.co.uk',  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop' },
  { name: 'David Osei',       phone: '+44 20 7946 0102', email: 'david@luxeestates.co.uk', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  { name: 'Sarah Mitchell',   phone: '+44 20 7946 0103', email: 'sarah@luxeestates.co.uk', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
];
const _images = {
  terraced:        ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=70','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=70','https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=70','https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&q=70','https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=70'],
  'semi-detached': ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=70','https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=70','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=70','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=70','https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=70'],
  detached:        ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=70','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=70','https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=70','https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=70','https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&q=70'],
  flat:            ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=70','https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=70','https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=70','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=70','https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=70'],
  bungalow:        ['https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&q=70','https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=70','https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=70','https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=70','https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=70'],
};
const _epc = ['A','B','C','C','D','D','E'];
const _nearby = ['Good local schools','Train station nearby','Shops & supermarkets','Parks & green spaces','NHS GP surgery','Restaurants & cafes','Bus links','Motorway access'];
const _rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

const _title = (type, city, beds) => {
  const t = { terraced: [`${beds}-Bed Terraced House in ${city}`,`Charming Terraced Home in ${city}`], 'semi-detached': [`${beds}-Bed Semi-Detached in ${city}`,`Family Semi-Detached in ${city}`], detached: [`${beds}-Bed Detached House in ${city}`,`Spacious Detached Home in ${city}`], flat: [`${beds}-Bed Flat in ${city}`,`Modern Apartment in ${city}`], bungalow: [`${beds}-Bed Bungalow in ${city}`,`Detached Bungalow in ${city}`] };
  return _rand(t[type] || [`${beds}-Bed Property in ${city}`]);
};
const _desc = (type, city, purpose) => {
  const v = purpose === 'For Sale' ? 'buy' : 'rent';
  const d = { terraced: `A well-presented terraced house in a popular residential street in ${city}. Bright lounge, modern kitchen, private rear garden. Close to local schools, shops and excellent transport — ideal for families looking to ${v}.`, 'semi-detached': `A lovely semi-detached house in ${city} with generous living space. Features kitchen-diner, private garden and off-road parking in a quiet, sought-after neighbourhood — perfect for growing families.`, detached: `An impressive detached property in a desirable area of ${city}. Generous accommodation including open-plan kitchen-diner, separate lounge, utility room, landscaped garden and double garage.`, flat: `A modern, well-maintained flat in the heart of ${city}. Open-plan living/kitchen, contemporary bathroom, allocated parking — ideal for young professionals or buy-to-let investors looking to ${v}.`, bungalow: `A delightful bungalow on a quiet road in ${city}. Single-storey living with bright lounge, fitted kitchen, two bedrooms, family bathroom and private garden. Perfect for those downsizing.` };
  return d[type] || `A well-presented property in ${city} available to ${v}.`;
};

const generateMockProperties = (count) => {
  const list = [];
  for (let i = 0; i < count; i++) {
    const pType = _rand(_propertyTypes);
    const loc   = _rand(_cities);
    const street = _rand(_streets);
    const houseNum = Math.floor(Math.random() * 120) + 1;
    const seller = _rand(_sellers);
    const purpose = Math.random() > 0.65 ? 'For Rent' : 'For Sale';
    const status = purpose === 'For Rent' ? 'Available' : _rand(['Available','New Listing','Under Offer']);
    let beds, baths, sqft, price;
    if (pType === 'flat')          { beds = Math.floor(Math.random()*3)+1; baths=1; sqft=beds*350+Math.floor(Math.random()*200); price=purpose==='For Sale'?beds*120000+Math.floor(Math.random()*80000):beds*700+Math.floor(Math.random()*400); }
    else if (pType === 'bungalow') { beds = Math.floor(Math.random()*2)+2; baths=1+(Math.random()>0.5?1:0); sqft=beds*400+Math.floor(Math.random()*200); price=purpose==='For Sale'?beds*95000+Math.floor(Math.random()*60000):beds*500+Math.floor(Math.random()*300); }
    else if (pType === 'terraced') { beds = Math.floor(Math.random()*2)+2; baths=1+(Math.random()>0.6?1:0); sqft=beds*350+Math.floor(Math.random()*250); price=purpose==='For Sale'?beds*90000+Math.floor(Math.random()*70000):beds*550+Math.floor(Math.random()*350); }
    else if (pType === 'semi-detached') { beds=Math.floor(Math.random()*2)+3; baths=1+(Math.random()>0.4?1:0); sqft=beds*380+Math.floor(Math.random()*300); price=purpose==='For Sale'?beds*100000+Math.floor(Math.random()*80000):beds*600+Math.floor(Math.random()*400); }
    else                           { beds = Math.floor(Math.random()*3)+3; baths=Math.floor(Math.random()*2)+2; sqft=beds*450+Math.floor(Math.random()*400); price=purpose==='For Sale'?beds*120000+Math.floor(Math.random()*100000):beds*800+Math.floor(Math.random()*600); }
    const nearbyPoints = [..._nearby].sort(()=>0.5-Math.random()).slice(0, Math.floor(Math.random()*3)+3);
    list.push({
      _id: new mongoose.Types.ObjectId().toString(),
      title: _title(pType, loc.city, beds),
      address: `${houseNum} ${street}, ${loc.city}, ${loc.postcode} ${Math.floor(Math.random()*9)+1}${String.fromCharCode(65+Math.floor(Math.random()*26))}`,
      price, beds, baths, sqft, status, purpose,
      propertyType: pType,
      images: _images[pType] || _images['flat'],
      description: _desc(pType, loc.city, purpose),
      seller,
      verified: Math.random() > 0.4,
      epcRating: _rand(_epc),
      coordinates: { lat: 51.5074+(Math.random()-0.5)*2.5, lng: -1.2+(Math.random()-0.5)*3 },
      nearbyPoints,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return list;
};

// ─────────────────────────────────────────────
// MOCK MODE STATE
// ─────────────────────────────────────────────
let isMockMode = false;
let mockProperties = [];
let mockContacts  = [];

const initMockData = () => {
  if (mockProperties.length === 0) {
    mockProperties = generateMockProperties(50);
    console.log(`\n[Mock Mode] ✅ Serving ${mockProperties.length} in-memory properties.\n`);
  }
};

// ─────────────────────────────────────────────
// MONGODB CONNECTION
// ─────────────────────────────────────────────
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) return cachedConnection;
  const conn = await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/luxury_real_estate',
    { bufferCommands: false, serverSelectionTimeoutMS: 3000 }
  );
  cachedConnection = conn;
  console.log('✅ MongoDB connected');
  return conn;
};

// Middleware: connect to DB or fall back to Mock Mode
app.use(async (req, res, next) => {
  if (isMockMode) return next();
  if (cachedConnection && mongoose.connection.readyState === 1) return next();
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('\n⚠️  MongoDB connection failed:', err.message);
    console.warn('⚠️  Switching to Mock Mode — properties will load from in-memory data.\n');
    isMockMode = true;
    initMockData();
    next();
  }
});

// ─────────────────────────────────────────────
// ADMIN AUTH
// ─────────────────────────────────────────────
const ADMIN_HASH = '$2b$10$SSyMS5jreGSTYokMnfPWtODtqaQHugurogLI9fphC7lwC8PFYj8vq';
const JWT_KEY = process.env.ADMIN_JWT_SECRET || 'luxe_estates_jwt_secret_2025';

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorised: No token provided' });
  try {
    req.admin = jwt.verify(authHeader.split(' ')[1], JWT_KEY);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorised: Invalid or expired token' });
  }
};

// ─────────────────────────────────────────────
// ADMIN LOGIN
// ─────────────────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'Password is required' });
    const envHash = process.env.ADMIN_PASSWORD_HASH;
    const storedHash = (envHash && envHash.startsWith('$2')) ? envHash : ADMIN_HASH;
    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password. Please try again.' });
    const token = jwt.sign({ role: 'admin' }, JWT_KEY, { expiresIn: '8h' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.get('/api/admin/test', (req, res) => {
  const envHash = process.env.ADMIN_PASSWORD_HASH || '';
  res.json({ ok: true, time: new Date().toISOString(), mockMode: isMockMode, hashSource: (envHash && envHash.startsWith('$2')) ? 'env' : 'hardcoded_fallback' });
});

// ─────────────────────────────────────────────
// MOCK FILTER HELPER
// ─────────────────────────────────────────────
const applyMockFilters = (arr, { location, type, price, purpose }) => {
  let r = [...arr];
  if (location) r = r.filter(p => p.address.toLowerCase().includes(location.toLowerCase()));
  if (purpose)  r = r.filter(p => p.purpose === purpose);
  if (type)     r = r.filter(p => p.propertyType === type.toLowerCase());
  if (price) {
    if (price === '0-200')    r = r.filter(p => p.price <= 200000);
    else if (price === '200-400') r = r.filter(p => p.price >= 200000 && p.price <= 400000);
    else if (price === '400-600') r = r.filter(p => p.price >= 400000 && p.price <= 600000);
    else if (price === '600+')    r = r.filter(p => p.price > 600000);
  }
  return r;
};

// ─────────────────────────────────────────────
// PUBLIC ROUTES
// ─────────────────────────────────────────────

// GET all properties (with filters)
app.get('/api/properties', async (req, res) => {
  try {
    if (isMockMode) return res.json(applyMockFilters(mockProperties, req.query));
    const { location, type, price, purpose } = req.query;
    const query = {};
    if (location) query.address    = { $regex: location, $options: 'i' };
    if (purpose)  query.purpose    = purpose;
    if (type)     query.propertyType = type.toLowerCase();
    if (price) {
      if (price === '0-200')    query.price = { $lte: 200000 };
      else if (price === '200-400') query.price = { $gte: 200000, $lte: 400000 };
      else if (price === '400-600') query.price = { $gte: 400000, $lte: 600000 };
      else if (price === '600+')    query.price = { $gt: 600000 };
      else if (price === '1-5')     query.price = { $gte: 1000000, $lte: 5000000 };
      else if (price === '5-10')    query.price = { $gte: 5000000, $lte: 10000000 };
      else if (price === '10+')     query.price = { $gt: 10000000 };
    }
    res.json(await Property.find(query));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
});

// GET single property
app.get('/api/properties/:id', async (req, res) => {
  try {
    if (isMockMode) {
      const p = mockProperties.find(x => x._id === req.params.id);
      return p ? res.json(p) : res.status(404).json({ message: 'Property not found' });
    }
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
});

// POST contact form
app.post('/api/contact', async (req, res) => {
  try {
    if (isMockMode) {
      mockContacts.unshift({ _id: new mongoose.Types.ObjectId().toString(), ...req.body, status: 'new', createdAt: new Date().toISOString() });
      return res.status(201).json({ message: 'Enquiry received successfully!' });
    }
    await new Contact(req.body).save();
    res.status(201).json({ message: 'Enquiry received successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving enquiry', error: error.message });
  }
});

// ─────────────────────────────────────────────
// ADMIN ROUTES (Protected)
// ─────────────────────────────────────────────

// POST create property
app.post('/api/properties', authenticateAdmin, async (req, res) => {
  try {
    if (isMockMode) {
      const p = { _id: new mongoose.Types.ObjectId().toString(), ...req.body, verified: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      mockProperties.unshift(p);
      return res.status(201).json(p);
    }
    const p = await new Property(req.body).save();
    res.status(201).json(p);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
});

// DELETE property
app.delete('/api/properties/:id', authenticateAdmin, async (req, res) => {
  try {
    if (isMockMode) {
      const idx = mockProperties.findIndex(p => p._id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Property not found' });
      mockProperties.splice(idx, 1);
      return res.json({ message: 'Property deleted successfully' });
    }
    const p = await Property.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
});

// PATCH verify property
app.patch('/api/properties/:id/verify', authenticateAdmin, async (req, res) => {
  try {
    if (isMockMode) {
      const p = mockProperties.find(x => x._id === req.params.id);
      if (!p) return res.status(404).json({ message: 'Property not found' });
      p.verified = true; p.verifiedAt = new Date().toISOString();
      return res.json(p);
    }
    const p = await Property.findByIdAndUpdate(req.params.id, { verified: true, verifiedAt: new Date() }, { new: true });
    if (!p) return res.status(404).json({ message: 'Property not found' });
    res.json(p);
  } catch (error) {
    res.status(500).json({ message: 'Error verifying property', error: error.message });
  }
});

// GET all contacts
app.get('/api/contacts', authenticateAdmin, async (req, res) => {
  try {
    if (isMockMode) return res.json(mockContacts);
    res.json(await Contact.find().sort({ createdAt: -1 }));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// PATCH contact status
app.patch('/api/contacts/:id/status', authenticateAdmin, async (req, res) => {
  try {
    if (isMockMode) {
      const c = mockContacts.find(x => x._id === req.params.id);
      if (!c) return res.status(404).json({ message: 'Contact not found' });
      c.status = req.body.status;
      return res.json(c);
    }
    const c = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!c) return res.status(404).json({ message: 'Contact not found' });
    res.json(c);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact status', error: error.message });
  }
});

// ─────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}\n`);
  });
}

export default app;
