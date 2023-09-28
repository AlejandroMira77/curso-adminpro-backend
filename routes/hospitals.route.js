//  Ruta: /api/hospitals

const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, postHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospitals.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getHospitals);

router.post('/', [
    validateJWT,
    check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validateFields
], postHospitals);

router.put('/:id', [
    validateJWT,
    check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validateFields
], updateHospitals);

router.delete('/:id', [ validateJWT ], deleteHospitals);

module.exports = router;