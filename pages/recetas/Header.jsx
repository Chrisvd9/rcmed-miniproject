import React from "react";

const Header = ({ pacienteNombre }) => {
  return (
    <header className="mb-4">
      <div className="flex justify-between h-16 items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <img className="h-8" src="./logo.png" alt="" />
        </a>

        <div className="">
          <h1 className="text-lg md:text-3xl font-bold">{pacienteNombre}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
