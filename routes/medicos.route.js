//  Ruta: /api/medicos

const { Router } = require('express');
const { getMedicos, postMedicos, updateMedicos, deleteMedicos } = require('../controllers/medicos.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', getMedicos);

router.post('/', [
    validateJWT,
    check('name', 'El name del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser válido').isMongoId(),
    validateFields
], postMedicos);

router.put('/:id', updateMedicos);

router.delete('/:id', deleteMedicos);

module.exports = router;