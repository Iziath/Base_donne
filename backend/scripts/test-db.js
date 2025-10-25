require('dotenv').config();
const mongoose = require('mongoose');

console.log('🧪 Test de connexion MongoDB Atlas...\n');

// Afficher l'URI (masquée pour sécurité)
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.log('❌ MONGODB_URI non définie dans .env');
  process.exit(1);
}

console.log('📡 URI utilisée:', uri.replace(/:(.*)@/, ':***@'));

// Test de connexion
mongoose.connect(uri)
  .then(async () => {
    console.log('MongoDB Atlas CONNECTÉ avec succès!');
    console.log('Base de données:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    
    // Test d'écriture
    const testCollection = mongoose.connection.db.collection('test_connection');
    const result = await testCollection.insertOne({
      message: 'Test de connexion RAMP-BENIN',
      timestamp: new Date(),
      status: 'success'
    });
    console.log('Test d\'écriture réussi');
    
    // Nettoyage
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('Données de test nettoyées');
    
    console.log(' TOUT FONCTIONNE PARFAITEMENT!');
    console.log('Votre base de données est prête pour RAMP-BENIN!');
    
    process.exit(0);
  })
  .catch(error => {
    console.error(' ERREUR:', error.message);
    
    console.log(' DIAGNOSTIC:');
    if (error.message.includes('auth failed')) {
      console.log(' Problème d\'authentification');
      console.log(' Vérifiez le mot de passe dans MongoDB Atlas');
    } else if (error.message.includes('getaddrinfo')) {
      console.log(' Problème de réseau');
      console.log(' Vérifiez votre connexion internet');
    } else {
      console.log(' Problème de configuration');
      console.log(' Vérifiez l\'URI dans le fichier .env');
    }
    
    process.exit(1);
  });