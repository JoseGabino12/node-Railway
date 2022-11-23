import express from "express";

import { createPool } from "mysql2/promise";

const pool = createPool({
  user: "root",

  password: "sp1dUEqMtOD2pmjgA8gp",

  host: "containers-us-west-99.railway.app",

  port: 7767,

  database: "railway",
});

const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido a este servidor..");
});

app.get("/usuarios", async (req, res) => {
  const [result] = await pool.query("select * from users");

  res.json(result[0]);
});

app.get("/agregarusuario", async (req, res) => {
  const nombre = req.query.nombre;

  const contrasena = req.query.contrasena;

  const correo = req.query.correo;

  const tienda = req.query.tienda;

  const [result] = await pool.query(
    `INSERT INTO users (name, password, email, store) VALUES ('${nombre}', '${contrasena}', '${correo}','${tienda}')`
  );

  res.json(result[0]);
});

app.listen(process.env.PORT || 3000);

console.log("Servidor corriendo en el puerto 3000");
