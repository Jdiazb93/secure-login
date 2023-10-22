const jwt = require('jwt-simple')
const dayjs = require('dayjs')

const SECRET_KEY = 'this_should_be_on_env'

exports.createToken = function (user) {
    const payload = {
            id: user.id,
            name: user.name,
            surName: user.surName,
            email: user.email,
            createToken: dayjs().unix(),
            exp: dayjs().add(5, 'minutes').unix()
    }

    return jwt.encode(payload, SECRET_KEY)
}

exports.decodeToken = function (token) {
    return jwt.decode(token, SECRET_KEY, true);
  };