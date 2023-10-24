const bcrypt = require('bcrypt')
const saltRounds = 10
const { prisma } = require('../connection/connection')
const jwt = require('../services/jwt')
const { emailValidator, cleanRUT } = require('../utils/validator')


//función de validación adicional a JWT.
const checkToken = async (payload) => {
    const userFounded = await prisma.users.findUnique({ where: { id: payload.id, email: payload.email } })

    if(!userFounded) return false

    const payloadFromUser = await jwt.decodeToken(userFounded.lastToken)

    if(payload.key === payloadFromUser.key && payload.exp === payloadFromUser.exp) {
        return true
    }

    return false
}

const checkEmail = async (email) => {
    try {
        const userFounded = await prisma.users.findFirst({ where: { email: email } })
        if(userFounded) return true
        return false
    } catch(e) {
        console.error(e)
    }
}

const signInFromSignUp = async (email) => {
    try {
        const userFounded = await prisma.users.findFirst({ where: { email: email.toLowerCase() } })

        const token = await jwt.createToken(userFounded)

        return {token: token}
    } catch(e) {
        console.error(e)
        return false
    }
}

const createUser = async (req, res) => {
    //Obtención de datos
    const { name, surName, email, position } = req.body;

    try {
        //Validación de datos importantes.
        if(!name || !surName || !email) return res.send({ status: 400, message: "Faltan datos para crear el usuario." })

        const isValid = await checkToken(req.user)

        if(!isValid) return res.send({ status: 500, message: "Token inválido." })

        const isEmail = await emailValidator(email)

        if(!isEmail) return res.send({ status: 400, message: "Email no valido." })

        const data = { name, surName, email, position }

        //Creación del nuevo usuario.
        const newUser = await prisma.usersRelated.create({ data: data })

        //En caso de error
        if(!newUser) return res.send({ status: 400, message: "Error al crear usuario." })
        
        //Caso de éxito.
        return res.send({ status: 200, message: "Usuario creado con éxito.", data: newUser })

    } catch(e) {
        console.error(e)
        return res.send({ status: 500, message: "Error del servidor al crear usuario." })
    }
}

const signUp = async (req, res) => {
    //Obtención de datos.
    const { name, surName, email, password, repeatPassword, rut } = req.body;

    try {
        //Se validan datos requeridos para generar un nuevo usuario.
        if(!name || !surName || !email || !password || !repeatPassword || !rut) return res.send({ status: 400, message: "Faltan datos para crear el usuario." }) 

        const isEmail = await emailValidator(email)

        if(!isEmail) return res.send({ status: 400, message: "Email no valido." })

        //Se valida password
        if(password !== repeatPassword) return res.send({ status: 400, message: "Las contraseñas deben ser iguales." })

        //Proceso de encriptación de password.
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if(err) return res.send({ status: 400, message: "Error al encriptar la contraseña, intentelo nuevamente." })
            if(hash) {

                const rutWithNumbers = cleanRUT(rut)

                if(!rutWithNumbers) return res.send({ status: 400, message: "Error en el rut." })

                //Se ordena la data del usuario a crear.
                const data = { name, surName, email, password: hash, rut: rutWithNumbers }

                //Se valida que el usuario no exista.
                const userExist = await checkEmail(email)

                //Si usuario existe, se entrega mensaje de error generico.
                if(userExist) return res.send({ status: 400, message: "Error al registrar el usuario." })

                //Creación del usuario.
                const newUser = await prisma.users.create({ data })

                const newSignIn = await signInFromSignUp(email)

                return res.send({ status: 200, message: "Datos correctos.", data: {newUser, token: newSignIn} })
            }
        })

    } catch(e) {
        res.send({ status: 500, message: "Error del servidor al crear el usuario." })
    }
}

const listRelatedUsers = async (req, res) => {
    try {
        const users = await prisma.usersRelated.findMany()

        const isValid = await checkToken(req.user)

        if(!isValid) return res.send({ status: 500, message: "Token inválido." })

        res.send({ status: 200, message: "Listado de usuarios.", data: users })
    } catch(e) {
        console.error(e)
        res.send({ status: 500, message: "Error del servidor." })
    }
}

const listUsers = async (req, res) => {
    try {
        //Se obtienen todos los usuarios.
        const userList = await prisma.users.findMany()

        res.send({ status: 200, message: "Listado de usuarios.", data: userList})
    } catch(e) {
        console.error(e)
        res.send({ status: 500, message: "Error del servidor." })
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Se valida que exista un correo y contraseña.
        if(!email || !password) return res.send({ status: 400, message: "Faltan datos." })

        const isEmail = await emailValidator(email)

        if(!isEmail) return res.send({ status: 400, message: "Email no valido." })

        //Se busca el usuario por correo.
        const userFounded = await prisma.users.findFirst({ where: { email: email.toLowerCase() } })

        if(userFounded) {
            //Cuándo el usuario es encontrado, se hace la comparación entre la contraseña entregada y el hash.
            bcrypt.compare(password, userFounded.password, async (err, valid) => {
                //Caso de error, se entregará un log completo en el servidor.
                if(err) {
                    console.error(err)
                    return res.send({ status: 400, message: "Error en credenciales." })
                }
                //Si valid es falso, la contraseña se encuentra equivocada, por seguridad no se entrega esa información (fuerza bruta).
                if(!valid) return res.send({ status: 400, message: "Error en credenciales." })

                //Si todo va bien, se responde con un nuevo token al front.
                const token = await jwt.createToken(userFounded)
                res.send({ status: 200, message: "Login exitoso.", data: {token: token} })
            })
        }
        if(!userFounded) return res.send({ status: 400, message: "Error en credenciales." })

    } catch(e) {
        //console.error(e)
        res.send({ status: 500, message: "Error del servidor." })
    }
}

module.exports = { signUp, listUsers, createUser, listRelatedUsers, signIn }