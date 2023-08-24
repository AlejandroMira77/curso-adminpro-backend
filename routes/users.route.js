//  Ruta: /api/users

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { getUsers, postUsers } = require('../controllers/users.controller');
const { validateFields } = require('../middlewares/validate-fields');

router.get('/', getUsers);

// middlewares []
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
], postUsers);

module.exports = router;