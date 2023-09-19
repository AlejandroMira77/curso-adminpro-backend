const fs = require('fs');
const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');

const updatePhoto = async (collection, id, nameFile) => {
    let pathOld = '';
    switch (collection) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No existe el id');
                return false;
            }
            pathOld = `./uploads/medicos/${medico.img}`;
            deletePhoto(pathOld)
            medico.img = nameFile;
            await medico.save();
            break;
        case 'usuarios':
            const user = await User.findById(id);
            if (!user) {
                console.log('No existe el id');
                return false;
            }
            pathOld = `./uploads/usuarios/${user.img}`;
            deletePhoto(pathOld)
            user.img = nameFile;
            await user.save();
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No existe el id');
                return false;
            }
            pathOld = `./uploads/hospitales/${hospital.img}`;
            deletePhoto(pathOld)
            hospital.img = nameFile;
            await hospital.save();
            break;
        default:
            break;
    }
}

const deletePhoto = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

module.exports = { updatePhoto };