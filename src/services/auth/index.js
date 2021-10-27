const jwt = require('jsonwebtoken');

const ensureAuth = (req, res, next) => {
    jwt.verify(req.headers ? req.headers.authorization : null, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            res.redirect(`${process.env.FRONTEND_URL}`)
        } else {
            req.user = decoded;
            next();
        }
    });
};


module.exports = { ensureAuth }