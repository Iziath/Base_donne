const express = require('express');
const Project = require('../models/Project');
const Activity = require('../models/Activity');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all projects
router.get('/', auth, async (req, res) => {
  try {
    const { statut } = req.query;
    let filter = {};
    
    if (statut) {
      filter.statut = statut;
    }

    const projects = await Project.find(filter)
      .populate('responsable', 'nom prenom email')
      .populate('equipe', 'nom prenom email')
      .populate('createdBy', 'nom prenom')
      .sort({ createdAt: -1 });
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get project by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('responsable', 'nom prenom email telephone')
      .populate('equipe', 'nom prenom email')
      .populate('createdBy', 'nom prenom');
    
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project
router.post('/', [auth, authorize('admin', 'gestionnaire')], async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdBy: req.user._id
    });
    
    await project.save();
    await project.populate('responsable', 'nom prenom email');
    await project.populate('createdBy', 'nom prenom');
    
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project
router.put('/:id', [auth, authorize('admin', 'gestionnaire')], async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('responsable', 'nom prenom email')
     .populate('createdBy', 'nom prenom');
    
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get project activities
router.get('/:id/activities', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ projet: req.params.id })
      .populate('animateurs', 'nom prenom')
      .populate('projet', 'nom')
      .sort({ dateDebut: -1 });
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;