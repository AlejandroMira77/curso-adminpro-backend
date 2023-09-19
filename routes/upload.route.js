//  Ruta: /api/upload

const Router = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, getPhoto } = require('../controllers/upload.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// middleware
router.use(expressFileUpload());

router.put('/:collection/:id', validateJWT, fileUpload);
router.get('/:collection/:photo', getPhoto);

module.exports = router;