import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AutenticacaoRegistro from "./components/Autenticacao/Registro/Registro.tsx";
import AutenticacaoLogin from "./components/Autenticacao/Login/Login.tsx";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer autoClose={3000} />
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/registro" element={<AutenticacaoRegistro />} />
        <Route path="/login" element={<AutenticacaoLogin />} />
        <Route path="/home" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
