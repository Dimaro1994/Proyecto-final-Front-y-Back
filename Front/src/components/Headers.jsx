import { Link } from "react-router-dom";
import { useMyContext } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";

export default function Footers() {
  const { myData, setMyData } = useMyContext();
  return (
    <header className="relative w-full h-20 bg-slate-900 flex items-center justify-center">
      <h1 className="text-white text-2xl font-medium">Portal de Opiniones</h1>
      {myData?.token ? (
        <div className="absolute right-5 flex gap-5 items-center">
          <h3 className="text-white">
            <span className="text-gray-400">Bienvenido</span> {myData.name}
          </h3>
          <div
            title="cerrar sesión"
            className="cursor-pointer"
            onClick={() => setMyData(null)}
          >
            <MdLogout fill="#fff" />
          </div>
        </div>
      ) : (
        <div className="absolute right-5">
          <Link to={"/login"}>
            <h3 className="text-white">Iniciar sesion</h3>
          </Link>
        </div>
      )}
    </header>
  );
}
