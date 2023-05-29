import {
  Button,
  TextField,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ImagemDeFundo from "../../../assets/ImagemDeFundo.png";
import "./Registro-estilo.css";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { PostCadastroDeUsuario } from "../../../api";
import { RegistroDeUsuario } from "../../../models/RegistroDeUsuario";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AutenticacaoRegistro() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  function quandoAvançar() {
    event?.preventDefault();
    montarObjetoDeRegistro(senha, nome, email);
  }

  async function montarObjetoDeRegistro(
    senha: string,
    nome: string,
    email: string
  ) {
    const payloadCadastroDePessoa: RegistroDeUsuario = {
      name: nome,
      password: senha,
      email,
    };

    criarUsuario(payloadCadastroDePessoa);
  }

  async function criarUsuario(payload: any) {
    const criacaoDeUsuario = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          navigate("/login");
          toast.success("Usuario Criado com sucesso!");
        } else if (data.statusCode === 400) {
          toast.error("Erro ao criar usuario ");
        }
      });
  }

  return (
    <>
      <h1 className="site-titulo">
        Seja bem-vindo à <span style={{ color: "#145ba1" }}>Licitando!</span>
      </h1>
      <div className="container">
        <div className="site-boas-vindas-container">
          <div className="site-boas-vindas-itens">
            <div>
              <img src={ImagemDeFundo} alt="" />
            </div>
          </div>
        </div>
        <Grid container sx={{ margin: 10 }}>
          <form onSubmit={quandoAvançar}>
            <Grid className="primeiro">
              <TextField
                variant="standard"
                label="Nome completo"
                type="text"
                name="nome"
                required
                id="nome"
                onChange={(event) => setNome(event.target.value)}
                fullWidth
              />
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
                label="Password"
              />
            </Grid>
            <Grid className="segundo-item">
              <TextField
                variant="standard"
                type="email"
                name="email"
                id="email"
                required
                label="E-mail"
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
              />
            </Grid>
            <div className="botoes">
              <Button
                type="submit"
                id="botao-submit"
                fullWidth
                variant="contained"
              >
                Avançar
              </Button>
              <Button variant="outlined" href="/login">
                Entrar
              </Button>
            </div>
          </form>
        </Grid>
      </div>
    </>
  );
}
