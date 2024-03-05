import { createContext, useContext, useState, useEffect } from "react"; // importamos createcontex, usecontext, usestate de react

const MyContext = createContext(); // guardamos el createcontext en una variable mycontext

const MyContextProvider = ({ children }) => { // creamos componente que recive un hijo o children
  const [myData, setMyData] = useState(""); // creamos un estado myData
  // retornamos el Provider 
  useEffect(() => {
    const token = localStorage.getItem("TOKEN_KEY");
    if (token) {
      setMyData(JSON.parse(token));
    }
  }, []);
  return ( 
    <MyContext.Provider value={{ myData, setMyData }}>
      {children}
    </MyContext.Provider>
  );
};

// creamos una funcion useMyContext
const useMyContext = () => { 
  const context = useContext(MyContext); // guardamos el useContext en una variable context
  if (!context) { // si no existe context mostramos el siguiente error
    throw new Error(
      "useMyContext debe ser utilizado dentro de un proveedor de MyContext"
    );
  }
  return context;
};
// exportamos el provider y el context
export { MyContextProvider, useMyContext };
