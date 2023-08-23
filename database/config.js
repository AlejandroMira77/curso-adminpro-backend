const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB connect');
    } catch (error) {
        throw new Error('Error iniciando BD', error);
    }
};

module.exports = { dbConnection };