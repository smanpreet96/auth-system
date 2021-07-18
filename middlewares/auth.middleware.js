const con = require('../config/db.config');
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');

verifyUser = (req, res, next) => {
    let token = req.header('x-access-token');
    if(!token)
    {
        return res.status(403).send([{ message: "Token not provided!" }]);
    }

    jwt.verify(token, config.key, (err, result) => {
        if(err)
        {
            return res.status(401).send([{ message: "You are not an Authorized user!" }]);
        }
        req.id = result.id;
        next();
    });
};

isAdminOrEditor = (req, res, next) => {
    var selectQuery = `SELECT * FROM users where id=${ req.id }`;
    con.query(selectQuery, (err, result) => {
        if(err)
        {
            res.status(500).send([{ message: err }]);
            return;
        }
        if(result[0].permissions.toLowerCase() === "admin")
        {
            req.admin = true;
            next();
            return;
        }
        else if(result[0].permissions.toLowerCase() === "editor")
        {
            req.admin = false;
            req.editor = true;
            next();
            return;
        }
    });
};

const authMiddleware = {
    verifyUser,
    isAdminOrEditor
};

module.exports = authMiddleware;