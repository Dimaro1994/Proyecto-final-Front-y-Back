import { createContext, useContext, useState } from "react";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [myData, setMyData] = useState("");

  return (
    <MyContext.Provider value={{ myData, setMyData }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContext debe ser utilizado dentro de un proveedor de MyContext"
    );
  }
  return context;
};

export { MyContextProvider, useMyContext };
