import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Private, { PrivateRole } from "./components/Private";
import { useEffect } from "react";
import CreateBook from "./components/CreateBook";
import Cart from "./components/Cart";




function App() {



  return (
    <>

      <Navbar />
      <Routes>
        <Route element={<Private />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route element={<PrivateRole />}>
          <Route exact path="/book" element={<CreateBook />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
