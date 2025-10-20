const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  genre: { type: String, enum: ['M', 'F'], required: true },
  dateNaissance: Date,
  telephone: String,
  email: String,
  adresse: {
    ville: String,
    quartier: String,
    rue: String
  },
  profession: String,
  niveauEducation: String,
  situationFamiliale: String,
  projets: [{
    projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    dateInscription: { type: Date, default: Date.now },
    statut: { type: String, enum: ['actif', 'inactif', 'termine'], default: 'actif' }
  }],
  activites: [{
    activite: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
    dateParticipation: Date,
    presence: { type: Boolean, default: false }
  }],
  indicateurs: [{
    nom: String,
    valeur: String,
    dateMesure: Date
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);