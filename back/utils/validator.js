const emailValidator = (email) => {
    // eslint-disable-next-line 
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const isValid = emailValid.test(email)

    return isValid
}

const cleanRUT = (rut) => {
    if (!rut) return false
  
    return String(rut).toLowerCase().replace(/[^0-9Kk]/g, '')
}

module.exports = { emailValidator, cleanRUT }