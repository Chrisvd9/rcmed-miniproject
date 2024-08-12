import React, { useEffect, useState } from "react";
import Header from "./Header";
import Pagination from "./Pagination";
import { navigate } from "vike/client/router";
import { ClipICon, FolderICon } from "./Icons";

export { Page };

function Page() {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pacienteNombre, setPacienteNombre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRecetas = async (page = 1) => {
      try {
        const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
        if (!token) {
          throw new Error("No se encontró el token de autenticación.");
        }

        const nombre = typeof window !== "undefined" ? sessionStorage.getItem("pacienteNombre") : null;
        if (nombre) {
          setPacienteNombre(nombre);
        }

        const response = await fetch(
          `http://rec-staging.recemed.cl/api/patients/prescriptions?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener las recetas");
        }

        const data = await response.json();
        setRecetas(data.data);
        setTotalPages(data.meta.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const params = new URLSearchParams(window.location.search);
    const initialPage = parseInt(params.get("page"), 10) || 1;
    setCurrentPage(initialPage);

    fetchRecetas(initialPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setLoading(true);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", newPage);
    navigate(`${window.location.pathname}?${searchParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="text-center grid place-content-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-500 mx-auto"></div>
        <h2 className="text-zinc-900mt-4">Cargando...</h2>
        <p className="text-zinc-600 ">Tus recetas están en camino</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <Header pacienteNombre={pacienteNombre} />
      <div className="grid lg:grid-cols-2 gap-4">
        {recetas.map(({ folio, id, speciality, doctor, code, inserted_at }) => (
          <div
            key={id}
            className="border p-4 bg-sky-100/50 text-gray-700 rounded-lg"
          >
            <div className="flex justify-between items-center border-b border-sky-400 mb-4">
              <p className="text-lg">
                Folio: <span className="font-bold text-gray-600">{folio}</span>
              </p>

              <div className="flex gap-4 items-center">
                <p className="font-bold text-sky-400">Receta de Medicamentos</p>
                <FolderICon className="h-5 w-5 text-sky-400" />
                <ClipICon className="h-5 w-5 text-sky-400" />
              </div>
            </div>

            <div className="grid gap-4">
              <p className="">Fecha de emisión: {inserted_at}</p>
              <h3 className="text-2xl text-sky-400 font-bold">
                DR: {doctor.first_name}
              </h3>
              <h5 className="text-lg">{speciality}</h5>

              <span>
                código: <b>{code}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
