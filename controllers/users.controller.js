const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const getUsers = async(req, res = response) => {
    const users = await User.find();
    res.json({ users });
}

const postUsers = async(req, res = response) => {
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

        await user.save();
        res.json({ user });   
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

module.exports = { getUsers, postUsers };