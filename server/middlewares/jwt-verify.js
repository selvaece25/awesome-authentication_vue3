const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

exports.verify = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    if (!token) res.status(403).json({error: "please provide a token"})
    else {
        jwt.verify(token.replace(/['"]+/g, ''), tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'failed to authenticate token'})
            req.user = value.data
            next()
        })
    }
}