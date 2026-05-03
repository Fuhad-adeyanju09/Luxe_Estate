import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Property from './models/Property.js';
import Contact from './models/Contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/luxury_real_estate')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

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
      if (price === '1-5') query.price = { $gte: 1000000, $lte: 5000000 };
      else if (price === '5-10') query.price = { $gte: 5000000, $lte: 10000000 };
      else if (price === '10+') query.price = { $gt: 10000000 };
    }

    const properties = await Property.find(query);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
});

// Single Property Details Route
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
});

// Contact Form Route
app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Contact message received successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving contact message', error: error.message });
  }
});
// Verify Property Route
app.patch('/api/properties/:id/verify', async (req, res) => {
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

// Create Property Route
app.post('/api/properties', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
});

// Delete Property Route
app.delete('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
});

// Get All Contacts Route
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Update Contact Status Route
app.patch('/api/contacts/:id/status', async (req, res) => {
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
