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