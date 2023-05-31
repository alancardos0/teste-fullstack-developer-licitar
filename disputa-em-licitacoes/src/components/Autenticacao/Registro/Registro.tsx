import {
  Button,
  TextField,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Container,
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

  function handdleSubmit() {
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
        <Container maxWidth="sm">
          <Typography
            color={"#145ba1"}
            variant="h4"
            align="center"
            gutterBottom
          >
            Registre-se
          </Typography>
          <form onSubmit={handdleSubmit}>
            <TextField
              name="name"
              label="Nome"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(event) => setNome(event.target.value)}
            />
            <TextField
              name="email"
              label="E-mail"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              name="password"
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(event) => setSenha(event.target.value)}
            />
            <Button fullWidth type="submit" variant="contained" color="primary">
              Registrar
            </Button>
          </form>
        </Container>
      </div>
    </>
  );
}
