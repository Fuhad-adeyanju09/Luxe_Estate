import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  sqft: { type: Number, required: true },
  status: { type: String, required: true },
  purpose: { type: String, enum: ['For Sale', 'For Rent'], required: true, default: 'For Sale' },
  images: [{ type: String }],
  propertyType: {
    type: String,
    required: true,
    default: 'semi-detached',
    // UK property types
    enum: ['terraced', 'semi-detached', 'detached', 'flat', 'bungalow', 'cottage', 'house', 'villa', 'apartment', 'penthouse'],
  },
  description: { type: String },
  seller: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
  },
  verified: { type: Boolean, default: false },
  verifiedAt: { type: Date },
  epcRating: { type: String, enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
  nearbyPoints: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
