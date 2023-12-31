const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { updatePhoto } = require('../helpers/update-photo');

const fileUpload = async (req, res = response) => {
    try {
        const collection = req.params.collection;
        const id = req.params.id;

        // validar colección
        const validCollection = ['medicos', 'hospitales', 'usuarios'];
        if (!validCollection.includes(collection)) {
            res.status(400).json({ msg: 'La colección tiene que ser usuarios/medicos/hospitales' });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({ msg: 'No hay ningun archivo' });
        }

        // procesar la imagen
        const file = req.files.imagen;
        const cutName = file.name.split('.');
        const extensionFile = cutName[cutName.length - 1];
        
        // validar extension
        extensionValid = ['png', 'jpg', 'jpeg', 'gif'];
        if (!extensionValid.includes(extensionFile)) {
            res.status(400).json({ msg: 'No es una extensión permitida' });
        }

        // generar el nombre del archivo
        // puede que se suba la imagen con un mismo nombre y se sobreescriba
        const nameFile = `${ uuidv4() }.${ extensionFile }`;

        // path para guardar la imagen
        const pathFile = `./uploads/${ collection }/${ nameFile }`;

        // mover la imagen
        file.mv(pathFile, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'error al mover la imagen' });
            }

            // actualizar base de datos
            updatePhoto(collection, id, nameFile);

            res.json({ ok: true, msg: 'File uploaded!', nameFile });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Error inesperado' });
    }
}

const getPhoto = async (req, res = response) => {
    const collection = req.params.collection;
    const photo = req.params.photo;
    const pathImg = path.join(__dirname, `../uploads/${ collection }/${ photo }`);
    
    // imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = { fileUpload, getPhoto };