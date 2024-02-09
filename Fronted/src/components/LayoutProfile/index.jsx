import axios from "axios";
import { useState } from "react";
import styles from "./styles.module.css";
import { LuLoader2 } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMyContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BACKEND;

const LayoutProfile = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const { myData, setMyData } = useMyContext();
  const handleRegister = async () => {
    setLoader(true);

    try {
      const url = !login ? `${apiUrl}/user` : `${apiUrl}/login`;
      const resp = await axios.post(url, { email, password });
      if (!login) {
        toast(resp?.message);
      } else {
        setMyData(resp?.data?.data)
        navigate('/home');
      }
    
    } catch (error) {
      const message = error?.response?.data?.message;
      toast(message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerBtn}>
        <div className={styles.titleLogin} onClick={() => setLogin(true)}>
          Perfil
        </div>
     
      </div>
      <div className={styles.containerForm}>
        <input
          className={styles.input}
          placeholder="Nombre"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Email"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <input
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <input
          className={styles.input}
          placeholder="nuevo password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.btn} onClick={handleRegister}>
          {!loader ? (
            <span>Editar</span>
          ) : (
            <LuLoader2 />
          )}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LayoutProfile;
