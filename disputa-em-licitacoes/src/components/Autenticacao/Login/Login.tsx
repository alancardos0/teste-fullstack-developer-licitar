import React, { useState } from "react";

import "./Login-estilo.css";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AutenticacaoLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [autenticacao, setAutenticacao] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  function quandoAvancar() {
    event?.preventDefault();
    montarObjetoDeLogin(email, senha);
  }

  function montarObjetoDeLogin(email: string, senha: string) {
    const objetoDeLogin = {
      email,
      password: senha,
    };
    PostLoginDeUsuario(objetoDeLogin);
  }

  function PostLoginDeUsuario(payloadLogin: any) {
    const autenticacaoDeUsuario = fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payloadLogin),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          if (localStorage.getItem("authorization")) {
            localStorage.removeItem("authorization");
            localStorage.setItem("authorization", data.acess_token);
          } else {
            localStorage.setItem("authorization", data.acess_token);
          }
          toast.success("Usuario Logado com sucesso!");
          navigate("/home");
        } else if (data.statusCode === 400) {
          toast.error("Erro ao criar usuario ");
        }
      });
  }
  return (
    <div>
      <div className="container-login">
        <div className="box">
          <h1>
            Faça
            <span style={{ color: "#145ba1" }}> Login</span>
          </h1>
          <div style={{ margin: 0 }}>
            <form onSubmit={quandoAvancar}>
              <div className="primeiro-item">
                <TextField
                  variant="standard"
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                  label="E-mail"
                  fullWidth
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <OutlinedInput
                  id="outlined-adornment-password"
                  fullWidth
                  onChange={(event) => setSenha(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end" variant="standard">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
              </div>
              <div className="botoes">
                <Button type="submit" fullWidth variant="contained">
                  Entrar
                </Button>
                <Button variant="outlined" href="/registro">
                  Registro
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutenticacaoLogin;
