const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  type: { 
    type: String, 
    enum: ['formation', 'distribution', 'atelier', 'reunion', 'sensibilisation', 'autre'],
    required: true 
  },
  dateDebut: { type: Date, required: true },
  dateFin: Date,
  lieu: {
    ville: String,
    adresse: String,
    coordonnees: {
      lat: Number,
      lng: Number
    }
  },
  participantsCibles: Number,
  participantsReels: Number,
  statut: { 
    type: String, 
    enum: ['planifie', 'en_cours', 'termine', 'annule'],
    default: 'planifie'
  },
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  animateurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  materiels: [{
    nom: String,
    quantite: Number,
    unite: String
  }],
  resultats: [{
    description: String,
    indicateur: String,
    valeur: Number
  }],
  photos: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);