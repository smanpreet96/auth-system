const authMiddleware = require('./auth.middleware');
const verifyRegistration = require('./verification.middleware');

module.exports = {
    authMiddleware,
    verifyRegistration
}