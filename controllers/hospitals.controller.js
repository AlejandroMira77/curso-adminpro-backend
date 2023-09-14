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
    res.json({ msg: 'update' });
}

const deleteHospitals = async (req, res = response) => {
    res.json({ msg: 'delete' });
}

module.exports = { getHospitals, postHospitals, updateHospitals, deleteHospitals };