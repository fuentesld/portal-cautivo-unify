// Route para administracion de usuarios
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");

const app = express();

app.get("/usuario", function(req, res) {
  // res. devuelve el body de la respuesta.
  // res.json devuelve en formato json
  // res.send devuelve en formato texto
  // res.json("GET Usuario LOCAL");

  //req.query devuelve parametros opcionales de la peticion usuario?desde=10
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({ estado: true }, "nombre email role estado img")
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({ ok: false, err });
      }

      Usuario.countDocuments({ estado: true }, (err, conteo) => {
        res.json({ ok: true, usuarios, NumRegDB: conteo });
      });
    });
});

app.post("/usuario", function(req, res) {
  // parse application/x-www-form-urlencoded (payload)
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  // console.log(usuario);

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({ ok: false, err });
    }
    // usuarioDB.password = null;
    res.json({ ok: true, usuario: usuarioDB });
  });
});

app.put("/usuario/:id", function(req, res) {
  // req. lee parametros enviados de la peticion.
  // res.params.xx lee la variable xx de la solicitud
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  // Version uno de evitar modificacion a ciertos campos por parte del usuario
  // delete body.google;
  // delete body.password;

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({ ok: false, err });
      }
      res.json({ ok: true, usuario: usuarioDB });
    }
  );
});

app.delete("/usuario/:id", function(req, res) {
  let id = req.params.id;
  let cambiaEstado = { estado: false };

  Usuario.findByIdAndUpdate(
    id,
    cambiaEstado,
    { new: true },
    (err, usuarioBorrado) => {
      if (err) {
        return res.status(400).json({ ok: false, err });
      }

      if (!usuarioBorrado)
        return res
          .status(400)
          .json({ ok: false, err: { message: "Usuario no encontrado" } });

      res.json({ ok: true, usuario: usuarioBorrado });
    }
  );
});

module.exports = app;
