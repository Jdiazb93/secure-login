const bcrypt = require('bcrypt')
const saltRounds = 10
const { prisma } = require('../connection/connection')

const checkEmail = async (email) => {
    try {
        const userFounded = await prisma.users.findFirst({ where: { email: email } })
        if(userFounded) return true
        return false
    } catch(e) {
        console.error(e)
    }
}

const signUp = async (req, res) => {
    //Obtención de datos.
    const { firstName, secondName, lastName, email, password, repeatPassword, rutOrPassport } = req.body;

    try {
        //Se validan datos requeridos para generar un nuevo usuario.
        if(!firstName || !lastName || !email || !password || !repeatPassword || !rutOrPassport) return res.send({ status: 400, message: "Faltan datos para crear el usuario." }) 

        //Se valida password
        if(password !== repeatPassword) return res.send({ status: 400, message: "Las contraseñas deben ser iguales." })

        //Proceso de encriptación de password.
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if(err) return res.send({ status: 400, message: "Error al encriptar la contraseña, intentelo nuevamente." })
            if(hash) {

                //Se ordena la data del usuario a crear.
                const data = { firstName, secondName, lastName, email, password: hash, rutOrPassport }

                //Se valida que el usuario no exista.
                const userExist = await checkEmail(email)

                //Si usuario existe, se entrega mensaje de error generico.
                if(userExist) return res.send({ status: 400, message: "Error al registrar el usuario." })

                //Creación del usuario.
                const newUser = await prisma.users.create({ data })

                return res.send({ status: 200, message: "Datos correctos.", data: newUser })
            }
        })

    } catch(e) {
        res.send({ status: 500, message: "Error del servidor al crear el usuario." })
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

module.exports = { signUp, listUsers }