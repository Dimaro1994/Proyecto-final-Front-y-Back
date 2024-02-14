import axios from "axios";
import { useState } from "react";
import styles from "./styles.module.css";
import { LuLoader2 } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMyContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACKEND;

const Formregister = () => {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const { myData, setMyData } = useMyContext();
  const handleRegister = async () => {
    setLoader(true);

    try {
      const url = !login ? `${apiUrl}/user` : `${apiUrl}/login`;
      const resp = await axios.post(url, { email, password, name });

      if (!login) {
        toast(resp?.message);
      } else {
        setMyData(resp?.data?.data);
        navigate("/home");
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
          {login ? "Login" : "Registrate"}
        </div>
        <div className={styles.labelLogin} onClick={() => setLogin(!login)}>
          {login
            ? "No tienes una cuenta? Registrate"
            : "Ya tienes una cuenta? Ingresa"}
        </div>
      </div>
      <div className={styles.containerForm}>
        {!login && (
          <input
            className={styles.input}
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.btn} onClick={handleRegister}>
          {!loader ? (
            <span>{!login ? "Registrar" : "Ingresar"}</span>
          ) : (
            <LuLoader2 />
          )}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Formregister;
