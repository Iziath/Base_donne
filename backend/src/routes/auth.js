const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Recherche du User
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    if (user.statut !== 'actif') {
      return res.status(401).json({ message: 'Compte désactivé' });
    }

    // Génération du token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Mettre à jour la date de dernier accès
    user.dernierAcces = new Date();
    await user.save();

    res.json({
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        telephone: user.telephone
      }
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Inscription (réservé aux admins)
router.post('/register', [auth, authorize('admin')], async (req, res) => {
  try {
    const { nom, prenom, email, password, role, telephone } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Créer le nouveau user
    const user = new User({
      nom,
      prenom,
      email,
      password,
      role: role || 'membre_projet',
      telephone
    });

    await user.save();

    res.status(201).json({ 
      message: 'Utilisateur créé avec succès',
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ message: 'Erreur de création', error: error.message });
  }
});

// Profil utilisateur
router.get('/profile', auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      nom: req.user.nom,
      prenom: req.user.prenom,
      email: req.user.email,
      role: req.user.role,
      telephone: req.user.telephone,
      dateInscription: req.user.dateInscription
    }
  });
});

module.exports = router;