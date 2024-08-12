import Footer from "./Footer";
import { Link } from "../../renderer/Link";

export { Page };

function Page() {
  return (
    <>
      <div className="grid h-screen place-content-center gap-4 bg-white px-4">
        <div className="text-center">
          <h1 className="text-2xl uppercase tracking-widest text-gray-500">
            Bienvenidos al test de
          </h1>
        </div>
        <img className="md:h-20" src="./logo.png" alt="" />
        <div className="mx-auto mt-4">
          <Link
            className="px-4 py-3 bg-rm-blue-100 rounded-3xl text-white transition-all duration-500 hover:bg-rm-blue-200"
            href="/rut"
          >
            Comenzar
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
