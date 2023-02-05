import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import ProtectedProvider from "./ProtectedProvider";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Logout from "./Logout";
import {AuthProvider} from "./AuthContext";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path={"/"} element={<ProtectedProvider><Landing/></ProtectedProvider>}/>
              <Route path={"/landing"} element={<Landing />} />
              <Route path={"/signup"} element={<Signup />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/forgot-password"} element={<ForgotPassword />} />
              <Route path={"/logout"} element={<Logout/>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
