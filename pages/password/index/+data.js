export { data };
import fetch from "node-fetch";

const data = async (pageContext) => {
  const { rut, password } = pageContext.urlParsed.search;

  if (!rut) {
    return { error: "RUT o contraseña faltante." };
  }

  try {
    const response = await fetch(
      "http://rec-staging.recemed.cl/api/users/log_in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            rut,
            password,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error:
          errorData.errors?.detail ||
          "Credenciales inválidas. Por favor, inténtelo de nuevo.",
      };
    }

    const userData = await response.json();

    return { userData, redirectTo: "/recetas" };
  } catch (err) {
    return {
      error:
        "Error en la comunicación con el servidor. Por favor, inténtelo de nuevo más tarde.",
    };
  }
};
