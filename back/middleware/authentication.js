const jwt = require('jwt-simple')
const dayjs = require('dayjs')

const SECRET_KEY = 'this_should_be_on_env'

exports.validateToken = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.send({ status: 400, message: "La petición no tiene cabecera de autenticación." });
    }

    const token = req.headers.authorization.replace("Bearer ", "");

    try {
        const payload = jwt.decode(token, SECRET_KEY)
        req.user = payload

        if (payload.exp <= dayjs().unix()) {
            return res.send({ status: 402, message: "El token ha expirado." });
        }
    } catch(e) {
        //console.error(e)
        return res.send({ status: 500, message: "Token inválido.", tokenStatus: false })
    }
    next()
}