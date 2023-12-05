import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { NoteContextProvider } from "./context/notes/NoteContext";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <NoteContextProvider>
          <Navbar />
          <Routes>
            {/* Routes used to change endpoints */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </NoteContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
