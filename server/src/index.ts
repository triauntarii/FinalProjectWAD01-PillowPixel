import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";
import userRouter from "./routes/userRouter";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route di define pada folder controller, setiap endpoint perlu dibuatkan route nya masing2
// sekarang ada userRoute, jika ingin buat list hotel, maka buatkan route baru dengan nama (ex: hotelRouter?)
// Pada folder routes, akan di define endpoint dan function yang di ambil di endPointnya => lanjut di userRoute.ts
app.use("/api/users", userRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Hotel Del Luna API",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
    },
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
    process.exit(1);
  }
};

startServer();
