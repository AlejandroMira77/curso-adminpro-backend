const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateJwt } = require('../helpers/jwt');

const getUsers = async (req, res = response) => {
    const from = Number(req.query.from) || 0;
    try {
        // ejecutar de manera simultanea varias promesas
        const [ users, total] = await Promise.all([
            User.find().skip(from).limit(5),
            User.countDocuments()
        ]);
        res.json({ users, total });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

const postUsers = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const existsEmail = await User.findOne({ email });
        if (existsEmail) {
            return res.status(400).json({ msg: 'El Email ya está registrado' });
        }
        const user = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Generar token
        const token = await generateJwt(user.id);

        await user.save();
        res.json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

const updateUser = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({ msg: 'No existe un usuario con ese id' });
        }

        const { password, google, email, ...fields } = req.body;
        if (userDB.email !== email) {
            const existsEmail = await User.findOne({ email });
            if (existsEmail) {
                res.status(400).json({ msg: 'Ya existe un usuario con ese email' });
            }
        }

        if (!userDB.google) {
            fields.email = email;
        } else if (userDB.email !== email) {
            return res.status(400).json({ msg: 'Usuarios de google no pueden cambiar su correo' });
        }
        const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true });
        res.json({ updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({ msg: 'No existe un usuario con ese id' });
        }
        await User.findByIdAndDelete(uid);
        res.json({ uid, msg: 'Usuario eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

module.exports = { getUsers, postUsers, updateUser, deleteUser };