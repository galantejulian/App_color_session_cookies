const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const { body } = require('express-validator');

const validations = [
	body('fullName').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('color').notEmpty().withMessage('Tienes que elegir un color'),
]





router.get('/', mainController.register)
router.post('/', validations, mainController.registerProcess);

router.get('/graciasVisita', mainController.graciasVisita)
router.post('/clear', mainController.olvidarColor)



module.exports = router;