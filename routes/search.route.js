//  Ruta: /api/all

const { Router } = require('express');
const { getSearch } = require('../controllers/search.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:search', validateJWT, getSearch);

module.exports = router;