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
    try {
        const id = req.params.id;
        const uid = req.uid;
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                msg: 'Medico no encontrado por id'
            })
        }
        const changeMedico = {
            ...req.body,
            user: uid   // ultimo usuario que modifico
        }
        const updateMedico = await Medico.findByIdAndUpdate(id, changeMedico, { new: true });
        res.json({ updateMedico });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

const deleteMedicos = async (req, res = response) => {
    try {
        const id = req.params.id;
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                msg: 'Medico no encontrado por id'
            })
        }
        await Medico.findByIdAndDelete(id);
        res.json({ msg: 'Medico eliminado...' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

const getMedicoById = async (req, res = response) => {
    try {
        const id = req.params.id;
        const medico = await Medico.findById(id)
        .populate('user', 'name email img')
        .populate('hospital', 'name');
        res.json({ medico });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

module.exports = { getMedicos, postMedicos, updateMedicos, deleteMedicos, getMedicoById };