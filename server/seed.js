import mongoose from 'mongoose';
import Property from './models/Property.js';
import dotenv from 'dotenv';

dotenv.config();

const propertyTypes = ['terraced', 'semi-detached', 'detached', 'flat', 'bungalow'];

const ukCities = [
  { city: 'London', postcode: 'E1' },
  { city: 'Manchester', postcode: 'M14' },
  { city: 'Birmingham', postcode: 'B15' },
  { city: 'Leeds', postcode: 'LS6' },
  { city: 'Bristol', postcode: 'BS8' },
  { city: 'Sheffield', postcode: 'S10' },
  { city: 'Liverpool', postcode: 'L15' },
  { city: 'Nottingham', postcode: 'NG7' },
  { city: 'Oxford', postcode: 'OX2' },
  { city: 'Cambridge', postcode: 'CB4' },
  { city: 'Edinburgh', postcode: 'EH3' },
  { city: 'Cardiff', postcode: 'CF14' },
];

const ukStreets = [
  'High Street', 'Park Road', 'Victoria Road', 'Church Lane', 'Station Road',
  'Mill Lane', 'King Street', 'Manor Way', 'The Green', 'Elm Avenue',
  'Maple Drive', 'Cedar Close', 'Birch Way', 'Rosewood Avenue', 'Oak Tree Road',
];

const statusList = ['Available', 'New Listing', 'Under Offer'];

const sellers = [
  { name: 'James Hargreaves', phone: '+44 20 7946 0100', email: 'james@luxeestates.co.uk', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  { name: 'Emma Clarke', phone: '+44 20 7946 0101', email: 'emma@luxeestates.co.uk', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop' },
  { name: 'David Osei', phone: '+44 20 7946 0102', email: 'david@luxeestates.co.uk', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  { name: 'Sarah Mitchell', phone: '+44 20 7946 0103', email: 'sarah@luxeestates.co.uk', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
];

const epcRatings = ['A', 'B', 'C', 'C', 'D', 'D', 'E'];
const nearbyOptions = ['Good local schools', 'Train station nearby', 'Shops & supermarkets', 'Parks & green spaces', 'NHS GP surgery', 'Restaurants & cafes', 'Bus links', 'Motorway access'];

// Realistic UK property images by type
const propertyImages = {
  terraced: [
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=70',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=70',
    'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=70',
    'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&q=70',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=70',
  ],
  'semi-detached': [
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=70',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=70',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=70',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=70',
    'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=70',
  ],
  detached: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=70',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=70',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=70',
    'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=70',
    'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&q=70',
  ],
  flat: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=70',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=70',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=70',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=70',
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=70',
  ],
  bungalow: [
    'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&q=70',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=70',
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=70',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=70',
    'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=70',
  ],
};

const getPropertyTitle = (type, cityName, beds) => {
  const titles = {
    terraced: [`${beds}-Bed Terraced House in ${cityName}`, `Charming Terraced Home in ${cityName}`, `Spacious Terraced House in ${cityName}`],
    'semi-detached': [`${beds}-Bed Semi-Detached in ${cityName}`, `Family Semi-Detached in ${cityName}`, `Well-Presented Semi in ${cityName}`],
    detached: [`${beds}-Bed Detached House in ${cityName}`, `Spacious Detached Home in ${cityName}`, `Stunning Detached Property in ${cityName}`],
    flat: [`${beds}-Bed Flat in ${cityName}`, `Modern Apartment in ${cityName}`, `Contemporary Flat in ${cityName}`],
    bungalow: [`${beds}-Bed Bungalow in ${cityName}`, `Detached Bungalow in ${cityName}`, `Well-Maintained Bungalow in ${cityName}`],
  };
  const options = titles[type] || [`${beds}-Bed Property in ${cityName}`];
  return options[Math.floor(Math.random() * options.length)];
};

const getDescription = (type, city, purpose) => {
  const verb = purpose === 'For Sale' ? 'buy' : 'rent';
  const descs = {
    terraced: `A well-presented ${type} house situated in a popular residential street in ${city}. The property benefits from a bright lounge, modern fitted kitchen, and a private rear garden. Close to local schools, shops and excellent public transport links — ideal for families or first-time buyers looking to ${verb} in a great location.`,
    'semi-detached': `This lovely ${type} house in ${city} offers spacious living accommodation throughout. Featuring a generous living room, well-equipped kitchen-diner, private rear garden and off-road parking. Located in a quiet, sought-after neighbourhood with good access to schools, shops and transport — perfect for growing families.`,
    detached: `An impressive ${type} property set in a desirable residential area of ${city}. The home offers generous accommodation across two floors, including a large open-plan kitchen-diner, separate living room, utility room, and a beautifully landscaped rear garden. With a double garage and ample driveway, this is a superb family home.`,
    flat: `A modern, well-maintained ${type} in the heart of ${city}. The property features an open-plan living/kitchen area, contemporary bathroom, and allocated parking. The building is well managed and in a convenient location — ideal for young professionals or buy-to-let investors looking to ${verb} near transport links and local amenities.`,
    bungalow: `A delightful ${type} located on a quiet residential road in ${city}. The property offers comfortable single-storey living, with a bright lounge, fitted kitchen, two good-sized bedrooms, a family bathroom, and a private garden. Well-suited to those downsizing or seeking accessible accommodation.`,
  };
  return descs[type] || `A well-presented property in ${city} available to ${verb}.`;
};

const generateUKProperties = (count) => {
  const properties = [];
  for (let i = 1; i <= count; i++) {
    const pType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const location = ukCities[Math.floor(Math.random() * ukCities.length)];
    const street = ukStreets[Math.floor(Math.random() * ukStreets.length)];
    const houseNumber = Math.floor(Math.random() * 120) + 1;
    const seller = sellers[Math.floor(Math.random() * sellers.length)];
    const status = statusList[Math.floor(Math.random() * statusList.length)];
    const purpose = Math.random() > 0.65 ? 'For Rent' : 'For Sale';

    let beds, baths, sqft, price;

    if (pType === 'flat') {
      beds = Math.floor(Math.random() * 3) + 1;
      baths = 1;
      sqft = beds * 350 + Math.floor(Math.random() * 200);
      price = purpose === 'For Sale'
        ? beds * 120000 + Math.floor(Math.random() * 80000)
        : beds * 700 + Math.floor(Math.random() * 400);
    } else if (pType === 'bungalow') {
      beds = Math.floor(Math.random() * 2) + 2;
      baths = 1 + (Math.random() > 0.5 ? 1 : 0);
      sqft = beds * 400 + Math.floor(Math.random() * 200);
      price = purpose === 'For Sale'
        ? beds * 95000 + Math.floor(Math.random() * 60000)
        : beds * 500 + Math.floor(Math.random() * 300);
    } else if (pType === 'terraced') {
      beds = Math.floor(Math.random() * 2) + 2;
      baths = 1 + (Math.random() > 0.6 ? 1 : 0);
      sqft = beds * 350 + Math.floor(Math.random() * 250);
      price = purpose === 'For Sale'
        ? beds * 90000 + Math.floor(Math.random() * 70000)
        : beds * 550 + Math.floor(Math.random() * 350);
    } else if (pType === 'semi-detached') {
      beds = Math.floor(Math.random() * 2) + 3;
      baths = 1 + (Math.random() > 0.4 ? 1 : 0);
      sqft = beds * 380 + Math.floor(Math.random() * 300);
      price = purpose === 'For Sale'
        ? beds * 100000 + Math.floor(Math.random() * 80000)
        : beds * 600 + Math.floor(Math.random() * 400);
    } else {
      // detached
      beds = Math.floor(Math.random() * 3) + 3;
      baths = Math.floor(Math.random() * 2) + 2;
      sqft = beds * 450 + Math.floor(Math.random() * 400);
      price = purpose === 'For Sale'
        ? beds * 120000 + Math.floor(Math.random() * 100000)
        : beds * 800 + Math.floor(Math.random() * 600);
    }

    const verified = Math.random() > 0.4;
    const epcRating = epcRatings[Math.floor(Math.random() * epcRatings.length)];
    const lat = 51.5074 + (Math.random() - 0.5) * 2.5;
    const lng = -1.2 + (Math.random() - 0.5) * 3;
    const shuffledNearby = [...nearbyOptions].sort(() => 0.5 - Math.random());
    const nearbyPoints = shuffledNearby.slice(0, Math.floor(Math.random() * 3) + 3);
    const images = propertyImages[pType] || propertyImages['flat'];

    properties.push({
      title: getPropertyTitle(pType, location.city, beds),
      address: `${houseNumber} ${street}, ${location.city}, ${location.postcode} ${Math.floor(Math.random() * 9) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      price,
      beds,
      baths,
      sqft,
      status: purpose === 'For Rent' ? 'Available' : status,
      purpose,
      propertyType: pType,
      images,
      description: getDescription(pType, location.city, purpose),
      seller,
      verified,
      epcRating,
      coordinates: { lat, lng },
      nearbyPoints,
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

    const mockData = generateUKProperties(50);
    await Property.insertMany(mockData);
    console.log(`Successfully seeded ${mockData.length} UK properties`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
