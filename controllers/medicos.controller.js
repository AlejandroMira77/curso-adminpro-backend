const { response } = require('express');
const Medico = require('../models/medico.model');

const getMedicos = async (req, res = response) => {
    try {
        const medicos = await Medico.find()
        .populate('user', 'name email img')
        .populate('hospital', 'name');
        res.json({ medicos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

const postMedicos = async (req, res = response) => {
    try {
        const uid = req.uid;
        const medico = new Medico({
            user: uid,
            ...req.body
        });
        const medicoDB = await medico.save();
        res.json({ msg: 'post', medico: medicoDB });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

const updateMedicos = async (req, res = response) => {
    res.json({ msg: 'update' });
}

const deleteMedicos = async (req, res = response) => {
    res.json({ msg: 'delete' });
}

module.exports = { getMedicos, postMedicos, updateMedicos, deleteMedicos };