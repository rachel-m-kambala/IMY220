//Mukaji Mweni Rachel Kambala u23559129 24

import React from "react";
import { Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import Header from "./components/common/Header";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/project/:id" element={<Project />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
