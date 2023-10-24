const jwt = require('jwt-simple')
const dayjs = require('dayjs')
const { prisma } = require('../connection/connection')

const SECRET_KEY = 'this_should_be_on_env'

exports.createToken = async function (user) {
    const payload = {
            id: user.id,
            name: user.name,
            surName: user.surName,
            email: user.email,
            createToken: dayjs().unix(),
            exp: dayjs().add(5, 'minutes').unix(),
            key: Math.random()
    }

    const token = jwt.encode(payload, SECRET_KEY)

    await prisma.users.update({ where: { id: user.id }, data: { lastToken: token } })

    return token
}

exports.decodeToken = function (token) {
    return jwt.decode(token, SECRET_KEY, true);
  };