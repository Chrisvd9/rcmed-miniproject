import { useState } from "react";
import { navigate } from "vike/client/router";
import { useData } from "../../../renderer/useData";

export { Page };

function Page() {
  const { error, rutValidated } = useData();
  const [rut, setRut] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (rut) {
      navigate(`/rut?rut=${encodeURIComponent(rut)}`);
    } else {
      alert("Por favor, ingrese su RUT.");
    }
  };

  if (rutValidated) {
    navigate(`/password?rut=${encodeURIComponent(rut)}`);
  }

  return (
    <div className="grid place-content-center h-screen gap-4">
      {hasSubmitted && error && (
        <div className="text-red-500 bg-red-100 p-4">{error}</div>
      )}

      <form
        className="w-full flex flex-col gap-4 md:border border-[#24242424] rounded-3xl p-12"
        onSubmit={handleNext}
      >
        <h2 className="text-xl text-gray-600 font-semibold">Portal Paciente</h2>
        <h1 className="text-4xl text-rm-blue-100 font-bold">
          Ingresa a tu portal
        </h1>
        <div>
          <label className="sr-only" htmlFor="rut">
            Rut
          </label>
          <input
            className="w-full border-2 rounded-lg border-gray-300 p-3 text-sm"
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            placeholder="INGRESA TU RUT"
          />
        </div>

        <button
          className="px-4 py-3 bg-rm-blue-100 rounded-3xl text-white transition-all duration-500 hover:bg-rm-blue-200"
          type="submit"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
}
