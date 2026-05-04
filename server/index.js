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

// CORS — allow all origins in dev, restrict in production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  /\.vercel\.app$/, // all vercel preview/production domains
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Postman, server-to-server)
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
// MONGODB CONNECTION — cached for serverless
// ─────────────────────────────────────────────
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }
  const conn = await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/luxury_real_estate',
    { bufferCommands: false }
  );
  cachedConnection = conn;
  console.log('MongoDB connected');
  return conn;
};

// Connect before every request (noop if already connected)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection failed:', err.message);
    res.status(503).json({ message: 'Database unavailable. Please try again.' });
  }
});

// ─────────────────────────────────────────────
// ADMIN AUTH CONFIG
// ─────────────────────────────────────────────
// Hardcoded fallback hash for 'LuxeAdmin1234'
// dotenv v17 may strip $ variables even in single-quoted values on some systems
const ADMIN_HASH = '$2b$10$SSyMS5jreGSTYokMnfPWtODtqaQHugurogLI9fphC7lwC8PFYj8vq';
const JWT_KEY = process.env.ADMIN_JWT_SECRET || 'luxe_estates_jwt_secret_2025';

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorised: No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorised: Invalid or expired token' });
  }
};

// ─────────────────────────────────────────────
// ADMIN LOGIN ROUTE (Public)
// ─────────────────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'Password is required' });

    // Use env hash if valid, otherwise fall back to hardcoded hash
    const envHash = process.env.ADMIN_PASSWORD_HASH;
    const storedHash = (envHash && envHash.startsWith('$2')) ? envHash : ADMIN_HASH;

    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password. Please try again.' });
    }

    const token = jwt.sign({ role: 'admin' }, JWT_KEY, { expiresIn: '8h' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('[Admin Login Error]', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Diagnostic endpoint — open in browser to verify server is running fresh
app.get('/api/admin/test', (req, res) => {
  const envHash = process.env.ADMIN_PASSWORD_HASH || '';
  res.json({
    ok: true,
    time: new Date().toISOString(),
    password: 'LuxeAdmin1234',
    hashSource: (envHash && envHash.startsWith('$2')) ? 'env' : 'hardcoded_fallback',
    envHashPrefix: envHash ? envHash.substring(0, 10) : 'empty',
  });
});

// ─────────────────────────────────────────────
// PUBLIC ROUTES
// ─────────────────────────────────────────────

// Properties Route (Search & Filter)
app.get('/api/properties', async (req, res) => {
  try {
    const { location, type, price, purpose } = req.query;
    let query = {};

    if (location) {
      query.address = { $regex: location, $options: 'i' };
    }
    if (purpose) {
      query.purpose = purpose;
    }
    if (type) {
      query.propertyType = type.toLowerCase();
    }
    if (price) {
      if (price === '0-200') query.price = { $lte: 200000 };
      else if (price === '200-400') query.price = { $gte: 200000, $lte: 400000 };
      else if (price === '400-600') query.price = { $gte: 400000, $lte: 600000 };
      else if (price === '600+') query.price = { $gt: 600000 };
      // Legacy ranges
      else if (price === '1-5') query.price = { $gte: 1000000, $lte: 5000000 };
      else if (price === '5-10') query.price = { $gte: 5000000, $lte: 10000000 };
      else if (price === '10+') query.price = { $gt: 10000000 };
    }

    const properties = await Property.find(query);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
});

// Single Property Details Route (Public)
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
});

// Contact Form Route (Public)
app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Enquiry received successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving enquiry', error: error.message });
  }
});

// ─────────────────────────────────────────────
// ADMIN-ONLY ROUTES (Protected)
// ─────────────────────────────────────────────

// Create Property (Admin only)
app.post('/api/properties', authenticateAdmin, async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
});

// Delete Property (Admin only)
app.delete('/api/properties/:id', authenticateAdmin, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
});

// Verify Property (Admin only)
app.patch('/api/properties/:id/verify', authenticateAdmin, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { verified: true, verifiedAt: new Date() },
      { new: true }
    );
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error verifying property', error: error.message });
  }
});

// Get All Contacts (Admin only)
app.get('/api/contacts', authenticateAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Update Contact Status (Admin only)
app.patch('/api/contacts/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact status', error: error.message });
  }
});

// Start server locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
