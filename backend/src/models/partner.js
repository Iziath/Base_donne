
const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom du partenaire est obligatoire'],
    trim: true
  },
  type: {
    type: String,
    enum: ['international', 'gouvernemental', 'prive', 'ong', 'autre'],
    required: [true, 'Le type de partenaire est obligatoire']
  },
  categorie: {
    type: String,
    required: [true, 'La catégorie est obligatoire'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  telephone: {
    type: String,
    trim: true
  },
  siteWeb: {
    type: String,
    trim: true
  },
  adresse: {
    ville: {
      type: String,
      trim: true
    },
    adresse: {
      type: String,
      trim: true
    }
  },
  statut: {
    type: String,
    enum: ['actif', 'en_negociation', 'suspendu', 'inactif'],
    default: 'actif'
  },
  partenariat: {
    type: String,
    required: [true, 'Le type de partenariat est obligatoire'],
    trim: true
  },
  dateDebut: {
    type: Date,
    required: [true, 'La date de début est obligatoire'],
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  contacts: [{
    nom: String,
    poste: String,
    email: String,
    telephone: String
  }],
  projets: [{
    type: String,
    trim: true
  }],
  documents: [{
    nom: String,
    url: String,
    type: String
  }]
}, {
  timestamps: true
});

// Index pour les recherches
partnerSchema.index({ nom: 'text', description: 'text', categorie: 'text' });

module.exports = mongoose.model('Partner', partnerSchema);