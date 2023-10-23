const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {
    try {
        const { email, name, picture } = await googleVerify(req.body.token);
        const userDB = await User.findOne({ email });
        let user;
        if (!userDB) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
        }

        // Guardar usuario
        await user.save();

        // Generar token
        const token = await generateJwt(user.id);

        res.json({ email, name, picture, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Error inesperado' });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    // Generar token
    const token = await generateJwt(uid);
    // Obtener user
    const userDB = await User.findById(uid);
    res.json({ token: token, usuario: userDB });
}

module.exports = { login, googleSignIn, renewToken };