import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import { useMyContext } from "../../context/AuthContext";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";
import ListOpinion from "./ListOpinion";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACKEND;

export default function FormrcreationOpinions() {
  const [loader, setLoader] = useState(); 
  const [opinion, setOpinion] = useState();
  const [opinions, setOpinions] = useState(); // estado 

  const { myData } = useMyContext();
  const navigate = useNavigate();

  const handleGetOpinion = async () => {
    try {
      const url = `${apiUrl}/`; // ruta del endpoint
      const resp = await axios.get(url); // hacemos el request hacia el endpoint 
      setOpinions(resp?.data?.data) // guardamos las opiniones en el estado opinions
    } catch (error) {
      const message = error?.response?.data?.message; 
      toast(message); // aqui mendiate toast mostramos en pantalle el mensaje de error
    } finally {
    }
  }; 

  const handleRegister = async () => {
    setLoader(true); // estado loader con valor true
    if(!myData?.token) {
      navigate('/login')
      return false;
    }
    try {
      const url = `${apiUrl}/opinion`; // ruta del endpoint
      const resp = await axios.post( // hacemos el request hacia el endpoint 
        url,
        { text: opinion },
        {
          headers: {
            Authorization: `${myData?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast(resp?.data.message); // aqui mostramos en pantalla el mensaje de respuesta del endpoint
    } catch (error) { 
      const message = error?.response?.data?.message; // si hay algun con request guardamos el mensaje de respuesta en esta variable message
      toast(message); // aqui mendiate toast mostramos en pantalle el mensaje de error
    } finally { 
      setLoader(false); // cambiamos el estado loader a false
      handleGetOpinion(); // ejecutamos la funcion handlegetopinion para llamar a las nuevas opiniones y que se muestren en pantalla 
    }
  };

  useEffect(()=> { // usamos useEffect para ejecutar la funcion en la primera del componente
    handleGetOpinion(); // funcion para traer las opiniones
  },[])

  return (
    <>
      <div className={styles.container}>
        <div className="mb-5">
          <Link to={'/profile'}>
            Ver mi perfil
          </Link>
        </div>
        <div className={styles.containerForm}>
          <h3>Crear opinion</h3> 

          <input // campo opion 
            className={styles.input}
            placeholder="Opinion"
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
          />

          <button className={styles.btn} onClick={handleRegister}>
            {!loader ? <span>Guardar</span> : <LuLoader2 />}
          </button> 
        </div>
        <ToastContainer />
        <ListOpinion opinions={opinions} /> {/*este componente recibe como prop las opiniones para listarlas en una tabla */}

      </div>
    </>
  );
}
