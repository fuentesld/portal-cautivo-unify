const express = require("express");
require("../config/config");

const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/usuario", function(req, res) {
  // res. devuelve el body de la respuesta.
  // res.json devuelve en formato json
  // res.send devuelve en formato texto
  res.json("GET Usuario");
});

app.post("/usuario", function(req, res) {
  // parse application/x-www-form-urlencoded (payload)
  let body = req.body;
  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: "El nombre es necesario"
    });
  } else {
    res.json({ persona: body });
  }
});

app.put("/usuario/:id", function(req, res) {
  // req. lee parametros enviados de la peticion.
  // res.params.xx lee la variable xx de la solicitud
  let id = req.params.id;
  res.json(id);
});

app.delete("/usuario", function(req, res) {
  res.json("DELETE Usuario");
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando en el puerto 3000");
});
