//  Ruta: /api/users

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, postUsers, updateUser, deleteUser } = require('../controllers/users.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT, validateADMIN_ROLE, validateADMIN_ROLE_sameUser } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);

// middlewares []
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
], postUsers);

router.put('/:id', [
    validateJWT,
    validateADMIN_ROLE_sameUser,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validateFields
], updateUser);

router.delete('/:id', [validateJWT, validateADMIN_ROLE], deleteUser);

module.exports = router;