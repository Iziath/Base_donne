const express = require('express');
const Project = require('../models/Project');
const Activity = require('../models/Activity');
const Beneficiary = require('../models/Beneficiary');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get dashboard statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    // Projects stats
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ statut: 'en_cours' });
    const newProjectsThisMonth = await Project.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Activities stats
    const totalActivities = await Activity.countDocuments();
    const activitiesThisMonth = await Activity.countDocuments({
      dateDebut: { $gte: startOfMonth }
    });
    const todayActivities = await Activity.countDocuments({
      dateDebut: { $gte: startOfDay }
    });

    // Beneficiaries stats
    const totalBeneficiaries = await Beneficiary.countDocuments();

    // Team stats
    const totalTeamMembers = await User.countDocuments({ statut: 'actif' });

    // Recent activities
    const recentActivities = await Activity.find()
      .populate('projet', 'nom')
      .sort({ dateDebut: -1 })
      .limit(5);

    // Projects progress
    const projectsProgress = await Project.find({ statut: 'en_cours' })
      .select('nom progression budget beneficiairesCibles statut')
      .sort({ progression: -1 })
      .limit(5);

    res.json({
      projects: {
        total: totalProjects,
        active: activeProjects,
        newThisMonth: newProjectsThisMonth
      },
      activities: {
        total: totalActivities,
        thisMonth: activitiesThisMonth,
        today: todayActivities
      },
      beneficiaries: {
        total: totalBeneficiaries
      },
      team: {
        total: totalTeamMembers
      },
      recentActivities,
      projectsProgress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;