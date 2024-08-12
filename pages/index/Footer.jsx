import React from "react";

const Footer = () => {
  return (
    <footer className="mt-4">
      <p className="text-center text-xs/relaxed text-gray-500">
        © Christian Vergara {new Date().getFullYear()}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
