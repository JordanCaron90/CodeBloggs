require("dotenv").config({ path: "./config.env" });
const jwt = require("jsonwebtoken");

const createToken = (user) => {

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d'});

};

const verifyToken = (token) => {

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

};

module.exports = {createToken,verifyToken};