const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/database');

// Charger les variables d'environnement
dotenv.config();

// Initialiser Express
const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(cors({origin: [
    'http://localhost:3000', // React dev server
    'http://localhost:5173', // Vite dev server
    'http://127.0.0.1:5500', // Live server
    // Ajoutez l'URL de votre frontend ici
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString(),
    message: '🚀 API RAMP-BENIN en marche!'
  });
});

// Routes principales
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/beneficiaries', require('./routes/beneficiaries'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API RAMP-BENIN',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      projects: '/api/projects',
      activities: '/api/activities',
      beneficiaries: '/api/beneficiaries',
      dashboard: '/api/dashboard/stats'
    }
  });
});

// ⚠️ CORRECTION : Gestion des erreurs 404 - sans '*'
app.use((req, res) => {
  res.status(404).json({
    message: 'Route non trouvée',
    path: req.originalUrl,
    availableEndpoints: [
      '/', 
      '/api/health', 
      '/api/auth', 
      '/api/projects', 
      '/api/activities', 
      '/api/beneficiaries', 
      '/api/dashboard/stats'
    ]
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n✨ ======================================`);
  console.log(`🚀 Serveur RAMP-BENIN démarré avec succès!`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 Environnement: ${process.env.NODE_ENV}`);
  console.log(`🔗 MongoDB: ${mongoose.connection.readyState === 1 ? '✅ Connecté' : '❌ Déconnecté'}`);
  console.log(`✨ ======================================\n`);
});