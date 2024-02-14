import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutRegister from "./components/LayoutRegister";
import LayoutOpinions from "./components/LayoutOpinions";
import LayoutProfile from "./components/LayoutProfile";

import Headers from "./components/Headers";
import Footers from "./components/Footers";
import { MyContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <MyContextProvider>
      <Router>
        <div className="w-full h-[100vh] bg-slate-500">
          <Headers />
          <Routes>
            <Route path="/" element={<LayoutOpinions />} />
            <Route path="/login" element={<LayoutRegister />} />
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
