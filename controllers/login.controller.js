const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // Verificar email
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({ msg: 'Email no valido' });
        }
        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(404).json({ msg: 'Contraseña no valida' });
        }
        // Generar token
        const token = await generateJwt(userDB.id);

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

module.exports = { login };