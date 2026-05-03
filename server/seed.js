import mongoose from 'mongoose';
import Property from './models/Property.js';
import dotenv from 'dotenv';

dotenv.config();

const propertyTypes = ['house', 'villa', 'apartment', 'penthouse'];
const cities = ['Beverly Hills, CA', 'Miami Beach, FL', 'Greenwich, CT', 'Manhattan, NY', 'Malibu, CA', 'Aspen, CO', 'Hamptons, NY', 'Bel Air, CA'];
const streetNames = ['Ocean Drive', 'Sunset Blvd', 'Maple Lane', 'Oak Street', 'Palm Ave', 'Highland Way', 'Mountain Rd', 'Valley View'];
const statusList = ['For Sale', 'Just Listed', 'Pending'];
const sellers = [
  { name: 'Michael Sterling', phone: '+1 (310) 555-0101', email: 'michael@luxeestates.com', avatar: 'https://placehold.co/150x150/0f172a/ffffff?text=MS' },
  { name: 'Sarah Jenkins', phone: '+1 (310) 555-0102', email: 'sarah@luxeestates.com', avatar: 'https://placehold.co/150x150/0f172a/ffffff?text=SJ' },
  { name: 'David Chen', phone: '+1 (310) 555-0103', email: 'david@luxeestates.com', avatar: 'https://placehold.co/150x150/0f172a/ffffff?text=DC' },
  { name: 'Elena Rodriguez', phone: '+1 (310) 555-0104', email: 'elena@luxeestates.com', avatar: 'https://placehold.co/150x150/0f172a/ffffff?text=ER' }
];

const epcRatings = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const nearbyOptions = ['Schools nearby', 'Transport links', 'Shops', 'Parks', 'Hospitals', 'Restaurants'];

const generateMockProperties = (count) => {
  const properties = [];
  for (let i = 1; i <= count; i++) {
    const pType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const street = streetNames[Math.floor(Math.random() * streetNames.length)];
    const seller = sellers[Math.floor(Math.random() * sellers.length)];
    const status = statusList[Math.floor(Math.random() * statusList.length)];
    
    const purpose = Math.random() > 0.6 ? 'For Rent' : 'For Sale';
    
    // Generate realistic stats based on type
    let beds, baths, sqft, price;
    if (pType === 'apartment') {
      beds = Math.floor(Math.random() * 3) + 1;
      baths = beds + (Math.random() > 0.5 ? 0.5 : 0);
      sqft = beds * 800 + Math.floor(Math.random() * 500);
      price = purpose === 'For Sale' 
        ? beds * 800000 + Math.floor(Math.random() * 500000)
        : beds * 3000 + Math.floor(Math.random() * 2000);
    } else if (pType === 'penthouse') {
      beds = Math.floor(Math.random() * 3) + 3;
      baths = beds + Math.floor(Math.random() * 2);
      sqft = beds * 1200 + Math.floor(Math.random() * 1000);
      price = purpose === 'For Sale'
        ? beds * 2000000 + Math.floor(Math.random() * 2000000)
        : beds * 8000 + Math.floor(Math.random() * 5000);
    } else {
      beds = Math.floor(Math.random() * 5) + 4;
      baths = beds + Math.floor(Math.random() * 3);
      sqft = beds * 1500 + Math.floor(Math.random() * 2000);
      price = purpose === 'For Sale'
        ? beds * 1500000 + Math.floor(Math.random() * 5000000)
        : beds * 10000 + Math.floor(Math.random() * 15000);
    }

    const verified = Math.random() > 0.5;
    const epcRating = epcRatings[Math.floor(Math.random() * epcRatings.length)];
    // Random coordinates roughly around London or general area
    const lat = 51.5074 + (Math.random() - 0.5) * 0.1;
    const lng = -0.1278 + (Math.random() - 0.5) * 0.1;
    
    const shuffledNearby = [...nearbyOptions].sort(() => 0.5 - Math.random());
    const nearbyPoints = shuffledNearby.slice(0, Math.floor(Math.random() * 3) + 2);

    properties.push({
      title: `Spectacular ${pType.charAt(0).toUpperCase() + pType.slice(1)} in ${city.split(',')[0]}`,
      address: `${Math.floor(Math.random() * 999) + 1} ${street}, ${city}`,
      price: price,
      beds: beds,
      baths: baths,
      sqft: sqft,
      status: purpose === 'For Sale' ? statusList[Math.floor(Math.random() * statusList.length)] : 'Available',
      purpose: purpose,
      propertyType: pType,
      images: [
        `https://placehold.co/800x600/0f172a/ffffff?text=${pType.toUpperCase()}+${i}+FRONT`,
        `https://placehold.co/800x600/0f172a/ffffff?text=${pType.toUpperCase()}+${i}+INTERIOR`,
        `https://placehold.co/800x600/0f172a/ffffff?text=${pType.toUpperCase()}+${i}+BEDROOM`,
        `https://placehold.co/800x600/0f172a/ffffff?text=${pType.toUpperCase()}+${i}+KITCHEN`,
        `https://placehold.co/800x600/0f172a/ffffff?text=${pType.toUpperCase()}+${i}+BATHROOM`,
      ],
      description: `Experience the pinnacle of luxury living in this stunning ${pType}. Featuring breathtaking views, state-of-the-art amenities, and meticulous attention to detail throughout. This exceptional property offers a rare opportunity to ${purpose === 'For Sale' ? 'own' : 'rent'} a piece of prime real estate in one of the most sought-after locations.`,
      seller: seller,
      verified: verified,
      epcRating: epcRating,
      coordinates: { lat, lng },
      nearbyPoints: nearbyPoints
    });
  }
  return properties;
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Property.deleteMany({});
    console.log('Cleared existing properties');
    
    const mockData = generateMockProperties(45);
    await Property.insertMany(mockData);
    console.log(`Successfully seeded ${mockData.length} properties`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
