export { data };

const data = async (pageContext) => {
  const { rut } = pageContext.urlParsed.search;

  if (!rut) {
    return { error: "el RUT es requerido." };
  }

  const rutIsValid = validateRut(rut);

  if (!rutIsValid) {
    return { error: "El RUT no es válido. Por favor, inténtelo de nuevo." };
  }

  return { rutValidated: true };
};

function validateRut(rutCompleto) {
  const regex = /^[0-9]+-[0-9kK]{1}$/;
  if (!regex.test(rutCompleto)) return false;

  const [rut, digv] = rutCompleto.split("-");
  return calculateDV(rut) === digv.toLowerCase();
}

function calculateDV(rut) {
  let M = 0,
    S = 1;
  for (let T = parseInt(rut, 10); T; T = Math.floor(T / 10)) {
    S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  }
  return S ? String(S - 1) : "k";
}
