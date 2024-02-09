import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import { useMyContext } from "../../context/AuthContext";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";
import CreateOpinion from "./createOpinion";

const apiUrl = import.meta.env.VITE_BACKEND;

export default function FormrcreationOpinions() {
  const [loader, setLoader] = useState();
  const [opinion, setOpinion] = useState();
  const [opinions, setOpinions] = useState();

  const { myData } = useMyContext();

  const handleGetOpinion = async () => {
    try {
      const url = `${apiUrl}/`;
      const resp = await axios.get(url);
      setOpinions(resp?.data?.data)
    } catch (error) {
      const message = error?.response?.data?.message;
      toast(message);
    } finally {
    }
  }; 

  const handleRegister = async () => {
    console.log("res");
    setLoader(true);
    try {
      const url = `${apiUrl}/opinion`;
      const resp = await axios.post(
        url,
        { text: opinion },
        {
          headers: {
            Authorization: `${myData}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast(resp?.data.message);
      console.log(resp?.data.message);
    } catch (error) {
      const message = error?.response?.data?.message;
      toast(message);
    } finally {
      setLoader(false);
      handleGetOpinion();
    }
  };

  useEffect(()=> {
    handleGetOpinion();
  },[])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerForm}>
          <h3>Crear opinion</h3>

          <input
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
        <CreateOpinion opinions={opinions} />

      </div>
    </>
  );
}
