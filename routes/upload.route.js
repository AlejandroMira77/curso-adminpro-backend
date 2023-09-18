//  Ruta: /api/upload

const Router = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload } = require('../controllers/upload.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// middleware
router.use(expressFileUpload());

router.put('/:collection/:id', validateJWT, fileUpload);

module.exports = router;