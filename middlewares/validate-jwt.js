const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT = (req, res = response, next) => {
    // Leer el token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token no valido', error });
    }
}

const validateADMIN_ROLE = async (req, res = response, next) => {
    try {
        const uid = req.uid;
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({ msg: 'Usuario no existe' });
        }
        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({ msg: 'No tiene permisos para hacerlo' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ msg: 'Error inesperado', error });
    }
}

const validateADMIN_ROLE_sameUser = async (req, res = response, next) => {
    const uid = req.uid;
    const id = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({ msg: 'Usuario no existe' });
        }
        if (userDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({ msg: 'No tiene permisos para hacerlo' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error inesperado', error });
    }
}

module.exports = { validateJWT, validateADMIN_ROLE, validateADMIN_ROLE_sameUser };