require('dotenv').config();

console.log('🔍 Vérification du fichier .env...\n');

const config = {
  'NODE_ENV': process.env.NODE_ENV,
  'PORT': process.env.PORT,
  'MONGODB_URI': process.env.MONGODB_URI ? '*** masqué ***' : 'NON DÉFINI',
  'JWT_SECRET': process.env.JWT_SECRET ? '*** masqué ***' : 'NON DÉFINI',
  'FRONTEND_URL': process.env.FRONTEND_URL
};

console.log('📋 Configuration détectée:');
Object.entries(config).forEach(([key, value]) => {
  console.log(`   ${key}: ${value}`);
});

// Vérification MongoDB
console.log('\n🔗 Vérification MongoDB:');
if (process.env.MONGODB_URI) {
  const isAtlas = process.env.MONGODB_URI.includes('mongodb+srv');
  const hasDatabase = process.env.MONGODB_URI.includes('/ramp-benin');
  
  console.log(`   Type: ${isAtlas ? 'MongoDB Atlas ✅' : 'MongoDB Local ⚠️'}`);
  console.log(`   Base de données: ${hasDatabase ? 'Définie ✅' : 'Manquante ❌'}`);
  
  if (!hasDatabase) {
    console.log('\n🚨 CORRECTION REQUISE:');
    console.log('   Ajoutez "/ramp-benin" avant le "?" dans MONGODB_URI');
    console.log('   Exemple: ...mongodb.net/ramp-benin?retryWrites...');
  }
} else {
  console.log('   ❌ MONGODB_URI non définie');
}