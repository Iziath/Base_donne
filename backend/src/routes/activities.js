const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    message: 'Liste des activités fonctionne!',
    activities: [
      { id: 1, titre: 'Activité Test 1' },
      { id: 2, titre: 'Activité Test 2' }
    ]
  });
});

module.exports = router;