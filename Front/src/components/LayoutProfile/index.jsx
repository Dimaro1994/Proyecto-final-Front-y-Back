import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { LuLoader2 } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListOpinion from "../LayoutOpinions/ListOpinion";
import { useMyContext } from "../../context/AuthContext";
import {  useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACKEND;

const LayoutProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [opinions, setOpinions] = useState();

  const { myData } = useMyContext();
  const navigate = useNavigate()

  useEffect(() => {
    if (!myData?.token){
      navigate('/')
    }
  },[])

  const handleEditProfile = async () => {
    setLoader(true);

    try {
      const url = `${apiUrl}/user/${myData.idUser}`; // ruta para endpoint editar profile
      const resp = await axios.put(
        url,
        { name, email, oldpassword: password, newpassword: newPassword }, // hacemos el request al endpoint usando axios
        {
          headers: {
            Authorization: `${myData?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (resp) {
        // si existe la respuesta, mostramos el mensaje que retorna el endpoint
        toast(resp?.message);
      }
    } catch (error) {
      // si ocurre algun mostramos el mensaje del endpoint
      const message = error?.response?.data?.message;
      toast(message);
    } finally {
      setLoader(false);
    }
  };

  const handleGetOpinion = async () => {
    try {
      const url = `${apiUrl}/`; // ruta del endpoint
      const resp = await axios.get(url); // hacemos el request hacia el endpoint
      setOpinions(resp?.data?.data); // guardamos las opiniones en el estado opinions
    } catch (error) {
      const message = error?.response?.data?.message;
      toast(message); // aqui mendiate toast mostramos en pantalle el mensaje de error
    } finally {
    }
  };

  useEffect(() => {
    handleGetOpinion();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerBtn}>
        <div className={styles.titleLogin} onClick={() => setLogin(true)}>
          Perfil
        </div>
      </div>
      {/* creadmos un formulario simple de 4 campos, nombre, email, password, y newpassword con el boton editar que llama a la funcion handleEditprofile*/}
      <div className={styles.containerForm}>
        <input
          className={styles.input}
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="nuevo password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className={styles.btn} onClick={handleEditProfile}>
          {!loader ? <span>Editar</span> : <LuLoader2 />}
        </button>
      </div>
      <div>
        <ListOpinion opinions={opinions} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LayoutProfile;
