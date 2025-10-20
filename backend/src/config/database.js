const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Tentative de connexion à MongoDB Atlas...');
    
    // ✅ CONNEXION SIMPLE sans options dépréciées
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB Atlas Connecté: ${conn.connection.host}`);
    console.log(`📊 Base de données: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    
    // Afficher l'URI (masquée) pour debug
    const maskedURI = process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.replace(/:(.*)@/, ':***@') : 
      'Non définie';
    console.log('📡 URI utilisée:', maskedURI);
    
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connecté à MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erreur Mongoose:', err);
});

module.exports = connectDB;