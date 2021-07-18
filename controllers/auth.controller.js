const con = require('../config/db.config');
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
    const newUser = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        role: req.body.role
    });

    var insertUserQuery = `INSERT INTO users (firstName, lastName, email, pswd, permissions)
    VALUES ('${ newUser.firstName }', '${ newUser.lastName }', '${ newUser.email }', '${ newUser.password }', '${ newUser.role }')`;
    con.query(insertUserQuery, (err, result) => {
        if(err)
        {
            res.status(500).send([{ message: err }]);
            return;
        }
        res.send([{ message: "Account successfully created" }]);
    });
};

exports.login = (req, res) => {
    var selectQuery = `SELECT * FROM users where email='${ req.body.email }'`;
    con.query(selectQuery, (err, result) => {
        if(err)
        {
            res.status(500).send([{ message: err }]);
            return;
        }

        if(!result)
        {
            return res.status(404).send([{ message: "User not found ." }]);
        }

        var packet = result[0];
        var isValidPassword = bcrypt.compareSync(req.body.password, packet.pswd);
        if(!isValidPassword)
        {
            return res.status(401).send([{ accessToken: null, message: "Incorrect password!" }]);
        }

        var token = jwt.sign({ id: packet.id }, config.key, { expiresIn: 43200 }); // Expires in 12 hours

        var authData = [{
            id: packet.id,
            firstName: packet.firstname,
            lastName: packet.lastname,
            email: packet.email,
            role: packet.permissions.toLowerCase(),
            accessToken: token
        }];
        
        res.status(200).json(authData).end();
    });
};