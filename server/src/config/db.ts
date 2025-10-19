import { Sequelize } from "sequelize";

// Inisialisasi database password, lebih baiknya tidak set credentials di sini. taruh ke env semua
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5433", 10),
  username: process.env.DB_USER || "admintabita",
  password: process.env.DB_PASSWORD || "tabita234",
  database: process.env.DB_NAME || "hoteldelluna_db",
  logging: false,
});

export default sequelize;
