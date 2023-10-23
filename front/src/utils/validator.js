//Validador de correo mediante regex
export const emailValidator = (email) => {
    // eslint-disable-next-line 
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const isValid = emailValid.test(email)

    return isValid
}

/**
 * Se valida longitud mínima del valor ingresado (funciona como un validador para la longitud de contraseñas.)
 * Esto solo sirve a nivel de front, puede ser skipeado y no funciona como lógica de sistema en backend.
 */
export const minLength = (value, minLength) => {
    const isValid = value.length > minLength

    return isValid
}

/**
 * Formateo de Rut, esta función agrega los puntos, el guión y la separación con el digito verificador
 */
export const formatRut = (rut) => {
    if (!rut) return "";
    const actual = rut.replace(/^0+/, "");
    if (actual !== "" && actual.length > 1) {
      const actualClean = actual.replace(/[^0-9Kk]/g, "");
      const start = actualClean.substring(0, actualClean.length - 1);
      let rutDots = "";
      var j = 1;
      for (let i = start.length - 1; i >= 0; i--) {
        const letter = start.charAt(i);
        rutDots = `${letter}${rutDots}`;
        if (j % 3 === 0 && j <= start.length - 1) {
          rutDots = `.${rutDots}`;
        }
        j++;
      }
      const dv = actualClean.substring(actualClean.length - 1);
      rutDots = `${rutDots}-${dv}`;
      return rutDots.toUpperCase();
    }
    return rut;
  };