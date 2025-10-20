const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String,
  objectifs: [String],
  dateDebut: { type: Date, required: true },
  dateFin: Date,
  budget: { type: Number, required: true },
  devise: { type: String, default: 'EUR' },
  statut: { 
    type: String, 
    enum: ['planifie', 'en_cours', 'suspendu', 'termine', 'annule'],
    default: 'planifie'
  },
  progression: { type: Number, min: 0, max: 100, default: 0 },
  beneficiairesCibles: Number,
  localisation: {
    ville: String,
    region: String,
    coordonnees: {
      lat: Number,
      lng: Number
    }
  },
  responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  equipe: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  partenaires: [String],
  indicateurs: [{
    nom: String,
    valeur: Number,
    unite: String,
    dateMesure: Date
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);