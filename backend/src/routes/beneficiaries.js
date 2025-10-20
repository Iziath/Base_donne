const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    message: 'Liste des bénéficiaires fonctionne!' 
  });
});

module.exports = router;