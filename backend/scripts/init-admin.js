require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User'); // Correction du chemin

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔗 Connecté à MongoDB');

    // Vérifier si un admin existe déjà
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  Un administrateur existe déjà:', existingAdmin.email);
      process.exit(0);
    }

    // Créer l'admin
    const admin = new User({
      nom: 'Admin',
      prenom: 'RAMP',
      email: 'admin@ramp-benin.org',
      password: 'admin123',
      role: 'admin',
      telephone: '+229 01 02 03 04'
    });

    await admin.save();
    console.log('✅ Administrateur créé avec succès!');
    console.log('📧 Email: admin@ramp-benin.org');
    console.log('🔑 Mot de passe: admin123');
    console.log('⚠️  Changez le mot de passe après la première connexion!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();