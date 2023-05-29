import { RegistroDeUsuario } from "./models/RegistroDeUsuario";

export async function PostCadastroDeUsuario(registroDeUsuario: any) {
  const data = registroDeUsuario;
  console.log("data", data);
  const request = await fetch("http://localhost:3000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: data,
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
  console.log(request);
}
