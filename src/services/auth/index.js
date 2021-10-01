const jwt = require('jsonwebtoken');

const createAuthToken = (body) => {
    const accessToken = jwt.sign(body, process.env.TOKEN_KEY);
    return accessToken;
};


module.exports = {createAuthToken}