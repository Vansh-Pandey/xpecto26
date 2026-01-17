import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Exhibition from "./pages/Exhibition";
import Events from "./pages/Events";
import About from "./pages/About";
// import Sessions from "./pages/Sessions";
import XpectoSideBar from "./components/XpectoSideBar";
import SmoothCursor from "./components/ui/SmoothCursor";

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <XpectoSideBar>
        <SmoothCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </XpectoSideBar>
    </div>
  );
}
