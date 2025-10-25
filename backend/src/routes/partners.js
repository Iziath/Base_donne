const express = require('express');
const router = express.Router();
const Partner = require('../models/partner'); // Vérifiez le chemin

//  Liste tous les partenaires avec pagination et filtres
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      statut,
      type,
      categorie
    } = req.query;

    // Construction de la requête de filtrage
    let query = {};
    
    // Filtre par recherche texte
    if (search) {
      query.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { categorie: { $regex: search, $options: 'i' } },
        { partenariat: { $regex: search, $options: 'i' } },
        { 'adresse.ville': { $regex: search, $options: 'i' } }
      ];
    }

    // Filtres supplémentaires
    if (statut && statut !== 'all') {
      query.statut = statut;
    }
    if (type && type !== 'all') {
      query.type = type;
    }
    if (categorie && categorie !== 'all') {
      query.categorie = categorie;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      select: '-__v' 
    };

 
    const partners = await Partner.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Partner.countDocuments(query);

    res.json({
      message: 'Liste des partenaires récupérée avec succès',
      partners: partners.map(partner => ({
        id: partner._id,
        nom: partner.nom,
        type: partner.type,
        categorie: partner.categorie,
        email: partner.email,
        telephone: partner.telephone,
        website: partner.siteWeb, 
        adresse: partner.adresse,
        statut: partner.statut,
        partenariat: partner.partenariat,
        dateDebut: partner.dateDebut,
        dateFin: partner.dateFin, 
        description: partner.description,
        contacts: partner.contacts,
        projets: partner.projets,
        documents: partner.documents,
        createdAt: partner.createdAt,
        updatedAt: partner.updatedAt
      })),
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalPartners: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des partenaires:', error);
    res.status(500).json({
      message: 'Erreur serveur lors de la récupération des partenaires',
      error: error.message
    });
  }
});

// Récupèrer un partenaire spécifique
router.get('/:id', async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    
    if (!partner) {
      return res.status(404).json({
        message: 'Partenaire non trouvé'
      });
    }

    res.json({
      message: 'Partenaire récupéré avec succès',
      partner: {
        id: partner._id,
        nom: partner.nom,
        type: partner.type,
        categorie: partner.categorie,
        email: partner.email,
        telephone: partner.telephone,
        website: partner.siteWeb,
        adresse: partner.adresse,
        statut: partner.statut,
        partenariat: partner.partenariat,
        dateDebut: partner.dateDebut,
        description: partner.description,
        contacts: partner.contacts,
        projets: partner.projets,
        documents: partner.documents,
        createdAt: partner.createdAt,
        updatedAt: partner.updatedAt
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du partenaire:', error);
    res.status(500).json({
      message: 'Erreur serveur lors de la récupération du partenaire',
      error: error.message
    });
  }
});

// Crée un nouveau partenaire
router.post('/', async (req, res) => {
  try {
    const {
      nom,
      type,
      categorie,
      email,
      telephone,
      website,
      adresse,
      statut,
      partenariat,
      dateDebut,
      description,
      contacts,
      projets
    } = req.body;

    // Validation des champs obligatoires
    if (!nom || !type || !categorie || !partenariat || !dateDebut) {
      return res.status(400).json({
        message: 'Les champs nom, type, categorie, partenariat et dateDebut sont obligatoires'
      });
    }

    const newPartner = new Partner({
      nom,
      type,
      categorie,
      email,
      telephone,
      siteWeb: website, 
      adresse,
      statut: statut || 'actif',
      partenariat,
      dateDebut,
      description,
      contacts: contacts || [],
      projets: projets || []
    });

    const savedPartner = await newPartner.save();

    res.status(201).json({
      message: 'Partenaire créé avec succès',
      partner: {
        id: savedPartner._id,
        nom: savedPartner.nom,
        type: savedPartner.type,
        categorie: savedPartner.categorie,
        email: savedPartner.email,
        telephone: savedPartner.telephone,
        website: savedPartner.siteWeb,
        adresse: savedPartner.adresse,
        statut: savedPartner.statut,
        partenariat: savedPartner.partenariat,
        dateDebut: savedPartner.dateDebut,
        description: savedPartner.description,
        contacts: savedPartner.contacts,
        projets: savedPartner.projets,
        createdAt: savedPartner.createdAt
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création du partenaire:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Données de validation invalides',
        error: error.message
      });
    }
    
    res.status(500).json({
      message: 'Erreur lors de la création du partenaire',
      error: error.message
    });
  }
});

//  Mis à jour un partenaire
router.put('/:id', async (req, res) => {
  try {
    const {
      nom,
      type,
      categorie,
      email,
      telephone,
      website,
      adresse,
      statut,
      partenariat,
      dateDebut,
      description,
      contacts,
      projets
    } = req.body;

    const updatedPartner = await Partner.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(nom && { nom }),
          ...(type && { type }),
          ...(categorie && { categorie }),
          ...(email && { email }),
          ...(telephone && { telephone }),
          ...(website && { siteWeb: website }),
          ...(adresse && { adresse }),
          ...(statut && { statut }),
          ...(partenariat && { partenariat }),
          ...(dateDebut && { dateDebut }),
          ...(description && { description }),
          ...(contacts && { contacts }),
          ...(projets && { projets })
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedPartner) {
      return res.status(404).json({
        message: 'Partenaire non trouvé'
      });
    }

    res.json({
      message: 'Partenaire mis à jour avec succès',
      partner: {
        id: updatedPartner._id,
        nom: updatedPartner.nom,
        type: updatedPartner.type,
        categorie: updatedPartner.categorie,
        email: updatedPartner.email,
        telephone: updatedPartner.telephone,
        website: updatedPartner.siteWeb,
        adresse: updatedPartner.adresse,
        statut: updatedPartner.statut,
        partenariat: updatedPartner.partenariat,
        dateDebut: updatedPartner.dateDebut,
        description: updatedPartner.description,
        contacts: updatedPartner.contacts,
        projets: updatedPartner.projets,
        updatedAt: updatedPartner.updatedAt
      }
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du partenaire:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Données de validation invalides',
        error: error.message
      });
    }
    
    res.status(500).json({
      message: 'Erreur lors de la mise à jour du partenaire',
      error: error.message
    });
  }
});

//Supprime un partenaire
router.delete('/:id', async (req, res) => {
  try {
    const deletedPartner = await Partner.findByIdAndDelete(req.params.id);

    if (!deletedPartner) {
      return res.status(404).json({
        message: 'Partenaire non trouvé'
      });
    }

    res.json({
      message: 'Partenaire supprimé avec succès',
      partner: {
        id: deletedPartner._id,
        nom: deletedPartner.nom
      }
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du partenaire:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression du partenaire',
      error: error.message
    });
  }
});

// Statistiques des partenaires
router.get('/stats/statistiques', async (req, res) => {
  try {
    const stats = await Partner.aggregate([
      {
        $facet: {
          total: [{ $count: 'count' }],
          byStatut: [
            { $group: { _id: '$statut', count: { $sum: 1 } } }
          ],
          byType: [
            { $group: { _id: '$type', count: { $sum: 1 } } }
          ],
          byCategorie: [
            { $group: { _id: '$categorie', count: { $sum: 1 } } }
          ],
          nouveauxCeMois: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
              }
            },
            { $count: 'count' }
          ]
        }
      }
    ]);

    const result = {
      total: stats[0]?.total[0]?.count || 0,
      byStatut: stats[0]?.byStatut || [],
      byType: stats[0]?.byType || [],
      byCategorie: stats[0]?.byCategorie || [],
      nouveauxCeMois: stats[0]?.nouveauxCeMois[0]?.count || 0
    };

    res.json({
      message: 'Statistiques récupérées avec succès',
      stats: result
    });
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    res.status(500).json({
      message: 'Erreur lors du calcul des statistiques',
      error: error.message
    });
  }
});

module.exports = router;