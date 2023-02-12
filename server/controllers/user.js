const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../model/user')



function notAuthorized(res) {
    return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'You need to login!' }] })
}

exports.authMuddleware = function (req, res, next) {
    const token = req.headers.authorization

    if (!token) {
        return notAuthorized(res)
    }

    // invalid token
    jwt.verify(token.split(' ')[1], config.SECRET, function (err, decodedToken) {
        if (err) {
            return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'Invalid token!' }] })
        }

        User.findById(decodedToken.userId, function (err, foundUser) {
            if (err) {
                return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'We can not find user!' }] })
            }
            
            if (!foundUser) {
                return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'User does not exit!' }] })
            }
            next()
        })
    });

}