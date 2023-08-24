const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = (req, res = response, next) => {
    const errors = validationResult(req);
    // verificar si esta lleno
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = { validateFields };