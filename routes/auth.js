const controller = require('../controllers/auth.controller');
const { verifyRegistration } = require('../middlewares');
const express = require('express');

var router = express.Router();

router.post('/register', [ verifyRegistration.checkDuplicateEmails ], controller.register);

router.post('/login', controller.login);

module.exports = router;