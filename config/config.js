// =============================
// variables de entorno
// =============================

process.env.PORT = process.env.PORT || 3000;

// =============================
// Base de datos
// =============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

if (process.env.NODE_ENV) urlDB = "mongodb://localhost:27017/portalCautivo";
else
  urlDB =
    "mongodb://portal-admin:Jointics2019.!@ds149056.mlab.com:49056/portalcautivo";
process.env.URLDB = urlDB;
