require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/test', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Serveur Express fonctionne!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Test de connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    
    app.listen(PORT, () => {
      console.log(`🚀 Serveur de test démarré sur http://localhost:${PORT}/test`);
      console.log('💡 Testez avec: curl http://localhost:8080/test');
    });
  })
  .catch(error => {
    console.error('❌ MongoDB erreur:', error.message);
    process.exit(1);
  });