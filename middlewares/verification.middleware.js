const con = require('../config/db.config');

checkDuplicateEmails = (req, res, next) => {
    var selectUserQuery = `SELECT * FROM users where email='${ req.body.email }'`;
    con.query(selectUserQuery, (err, result) => {
        if(err)
        {
            res.status(500).send([{ message: err }]);
            return;
        }
        if(result.length>0)
        {
            res.status(400).send([{ message: "Account already exists!!" }]);
            return;
        }
        next();
    });
};

const verificationMiddleware = {
    checkDuplicateEmails
}

module.exports = verificationMiddleware;