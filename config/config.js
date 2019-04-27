// =============================
// variables de entorno
// =============================

process.env.PORT = process.env.PORT || 3000;

// =============================
// Base de datos
// =============================
let urlDB;
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

if (process.env.NODE_ENV === "dev")
  urlDB = "mongodb://localhost:27017/portalCautivo";
else urlDB = process.env.MONGO_URI;
process.env.URLDB = urlDB;

// =============================
// Vencimiento SEED
// =============================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =============================
// SEED de autenticacion
// =============================
process.env.SEED = process.env.SEED || "secret";
