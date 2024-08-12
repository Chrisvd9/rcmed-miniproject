import { useEffect, useState } from "react";
import { navigate } from "vike/client/router";
import { useData } from "../../../renderer/useData";

export { Page };

function Page() {
  const { error, userData, redirectTo } = useData();
  const [password, setPassword] = useState("");
  const [rut, setRut] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rutFromUrl = params.get("rut");
    if (rutFromUrl) {
      setRut(rutFromUrl);
    } else {
      alert("RUT no encontrado. Redirigiendo al inicio...");
      navigate("/rut");
    }
  }, []);

  useEffect(() => {
    if (userData && userData.data.token) {
      sessionStorage.setItem("authToken", userData.data.token);

      const pacienteNombre = `${userData.data.profiles[0].first_name} ${userData.data.profiles[0].last_name}`;
      sessionStorage.setItem("pacienteNombre", pacienteNombre);
    }

    if (redirectTo) {
      navigate(redirectTo);
    }
  }, [userData, redirectTo]);

  const handleLogin = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (rut && password) {
      navigate(`/password?rut=${rut}&password=${encodeURIComponent(password)}`);
    } else {
      alert("Por favor, ingrese su contraseña.");
    }
  };

  return (
    <div className="grid place-content-center h-screen gap-4">
      {hasSubmitted && error && (
        <div className="text-red-500 bg-red-100 p-4">{error}</div>
      )}
      <form
        className="w-full flex flex-col gap-4 md:border border-[#24242424] rounded-3xl p-12"
        onSubmit={handleLogin}
      >
        <h2 className="text-xl text-gray-600 font-semibold">Portal Paciente</h2>
        <h1 className="text-4xl text-rm-blue-100 font-bold">
          Ingresa a tu portal
        </h1>
        <div>
          <label className="sr-only" htmlFor="password">
            Contraseña
          </label>
          <input
            className="w-full border-2 rounded-lg border-gray-300 p-3 text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="INGRESA TU CONTRASEÑA"
          />
        </div>

        <button
          className="px-4 py-3 bg-rm-blue-100 rounded-3xl text-white transition-all duration-500 hover:bg-rm-blue-200"
          type="submit"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
