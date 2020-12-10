const jwt = require('jsonwebtoken')

module.exports = {
    authentication: (req, res, next) => {
        const bearerHeader = req.headers.authorization
        let token;
        if(bearerHeader) {
            token = bearerHeader.split(' ')[1]
        }
    
        if(!token) {
            return res.sendStatus(403)
        }

    
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) {
                return res.sendStatus(403)
            }
    
            req.token = user
            next()
        })
    },
    authorization: (req, res, next) => {
        const token = req.token
        if(token.role === 5) {
            res.sendStatus(403)
        }

        next()
    }
}