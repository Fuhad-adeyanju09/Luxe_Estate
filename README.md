# Luxury Real Estate Portal

A high-fidelity, feature-rich real estate application inspired by professional property portals. This platform is designed to offer a premium user experience for browsing, searching, and inquiring about luxury properties for sale or rent.

## 🎯 Objective

The main objective of this website is to provide a modern, highly responsive, and visually appealing real estate portal. It aims to bridge the gap between real estate agents and potential buyers/renters by offering:
- An intuitive and dynamic search and filtering system.
- Comprehensive property detail pages featuring multi-image galleries.
- A seamless contact pipeline for inquiries.
- A luxurious and professional aesthetic that builds trust and engagement.

## 🚀 Tech Stack

### Frontend
- **React 19** - UI Library
- **Vite** - Build Tool & Development Server
- **Tailwind CSS 4** - Utility-first styling framework
- **React Router DOM** - Client-side routing
- **Lucide React** - SVG Icons

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and Object Data Modeling (ODM)
- **CORS** & **Dotenv** - Middleware and environment configuration

## 🌟 Key Features

1. **Property Discovery**
   - Browse a curated list of featured luxury properties.
   - Dynamic search and filter functionality (by location, property type, price range, and purpose: "For Sale" or "For Rent").

2. **Detailed Property View**
   - Individual property pages with high-quality, multi-image galleries.
   - Comprehensive details including price, location, amenities, and property descriptions.

3. **User Engagement**
   - Integrated contact forms for direct inquiries.
   - Testimonials and "Why Choose Us" sections to build credibility.
   - Responsive design tailored for seamless usage across desktop, tablet, and mobile devices.

## 📂 Project Structure

```
├── public/                 # Static assets
├── server/                 # Backend Node.js/Express application
│   ├── models/             # Mongoose schemas (Property.js, Contact.js)
│   ├── index.js            # Express server entry point & API routes
│   └── seed.js             # Database seeding script
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components (Navbar, Footer, Hero, etc.)
│   ├── pages/              # Route components (HomePage, PropertiesPage, PropertyDetailsPage)
│   ├── App.jsx             # Main application component & routing setup
│   ├── index.css           # Global styles & Tailwind entry
│   └── main.jsx            # React mounting point
├── .env                    # Environment variables (e.g., MONGODB_URI)
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 🛠️ How to Run Locally

### Prerequisites
- Node.js installed on your machine.
- MongoDB running locally or a MongoDB Atlas URI.

### Setup Instructions

1. **Install Dependencies**
   Run the following command in the root directory to install both frontend and backend dependencies:
   ```bash
   npm install
   ```

2. **Environment Variables**
   Ensure your `.env` file is set up in the root directory with the necessary variables:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://127.0.0.1:27017/luxury_real_estate
   ```

3. **Seed the Database (Optional)**
   If you want to populate your local database with sample properties:
   ```bash
   npm run seed
   ```

4. **Run the Application**
   You can run both the Vite frontend development server and the Node.js backend server simultaneously using the concurrently script:
   ```bash
   npm run dev:all
   ```
   - The frontend will typically run on `http://localhost:5173`
   - The backend API will run on `http://localhost:3001`

## 🤝 API Endpoints

- `GET /api/properties` - Fetch all properties (supports query parameters for filtering).
- `GET /api/properties/:id` - Fetch details for a specific property.
- `POST /api/contact` - Submit a new contact/inquiry message.
