import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutRegister from "./components/LayoutRegister";
import LayoutOpinions from "./components/LayoutOpinions";
import LayoutProfile from "./components/LayoutProfile";
import Headers from "./components/Headers";
import Footers from "./components/Footers";
import { MyContextProvider, useMyContext } from "./context/AuthContext";

const App = () => {
  return (
    <MyContextProvider>
      <Router>
        <div style={{ width: "100%" }}>
          <Headers />
          <Routes>
            <Route path="/" element={<LayoutRegister />} />
            <Route path="/home" element={<LayoutOpinions />} />
            <Route path="/profile" element={<LayoutProfile />} />
          </Routes>
          <Footers />
        </div>
      </Router>
    </MyContextProvider>
  );
};

export default App;
