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

const getCollection = async (req, res = response) => {
    const table = req.params.table;
    const search = req.params.search;
    const regexp = new RegExp(search, 'i');
    let data = [];
    try {
        switch (table) {
            case 'medicos':
                data = await Medico.find({ name: regexp });
            break;
            case 'hospitales':
                data = await Hospital.find({ name: regexp });
            break;
            case 'usuarios':
                data = await User.find({ name: regexp });
            break;
            default:
                return res.status(400).json({
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                });
            }
        res.json({ resultados: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

module.exports = { getSearch, getCollection };