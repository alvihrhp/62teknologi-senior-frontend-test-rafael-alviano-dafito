import React from "react";
/** Screens */
import { Home } from "./screens";
/** React Router Dom */
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-y-auto flex flex-col items-center">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
