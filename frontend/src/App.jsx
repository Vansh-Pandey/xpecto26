import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Exhibition from "./pages/Exhibition";
// import Events from "./pages/Events";
// import Sessions from "./pages/Sessions";
import XpectoSideBar from "./components/XpectoSideBar";
import SmoothCursor from "./components/ui/SmoothCursor";

export default function App() {
  return (
    <XpectoSideBar>
      <SmoothCursor/>
      <Routes>
        <Route path="/" element={<Home />} /> 
      </Routes>
    </XpectoSideBar>
  );
}