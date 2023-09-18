//  Ruta: /api/all

const { Router } = require('express');
const { getSearch, getCollection } = require('../controllers/search.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:search', validateJWT, getSearch);

router.get('/collection/:table/:search', validateJWT, getCollection);

module.exports = router;