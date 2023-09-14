const { response } = require('express');
const User = require('../models/user.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const getSearch = async (req, res = response) => {
    const search = req.params.search;
    const regexp = new RegExp(search, 'i');
    try {
        const [ users, medicos, hospitales ] = await Promise.all([
            User.find({ name: regexp }),
            Medico.find({ name: regexp }),
            Hospital.find({ name: regexp })
        ])
        res.json({ users, medicos, hospitales });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

module.exports = { getSearch };