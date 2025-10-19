"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Inisialisasi database password, lebih baiknya tidak set credentials di sini. taruh ke env semua
const sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5433", 10),
    username: process.env.DB_USER || "admintabita",
    password: process.env.DB_PASSWORD || "tabita234",
    database: process.env.DB_NAME || "hoteldelluna_db",
    logging: false,
});
exports.default = sequelize;
