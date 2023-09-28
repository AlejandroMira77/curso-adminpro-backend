const { response } = require('express');
const Hospital = require('../models/hospital.model');

const getHospitals = async (req, res = response) => {
    try {
        const hospitals = await Hospital.find().populate('user', 'name email img');
        res.json({ hospitales: hospitals });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

const postHospitals = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });
    try {
        const hospitalDB = await hospital.save();
        res.json({ hospitalDB });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

const updateHospitals = async (req, res = response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                msg: 'Hospital no encontrado por id'
            });
        }
        const changeHospital = {
            ...req.body,
            user: uid   // ultimo usuario que modifico
        }
        const updateHospital = await Hospital.findByIdAndUpdate(id, changeHospital, { new: true });
        res.json({ updateHospital });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

const deleteHospitals = async (req, res = response) => {
    try {
        const id = req.params.id;
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                msg: 'Hospital no encontrado por id'
            });
        }
        await Hospital.findByIdAndDelete(id);
        res.json({ msg: 'Hospital eliminado...' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
}

module.exports = { getHospitals, postHospitals, updateHospitals, deleteHospitals };