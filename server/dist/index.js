"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Route di define pada folder controller, setiap endpoint perlu dibuatkan route nya masing2
// sekarang ada userRoute, jika ingin buat list hotel, maka buatkan route baru dengan nama (ex: hotelRouter?)
// Pada folder routes, akan di define endpoint dan function yang di ambil di endPointnya => lanjut di userRoute.ts
app.use("/api/users", userRouter_1.default);
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
        await db_1.default.authenticate();
        console.log("✅ Database connected successfully");
        // Sync models with database
        await db_1.default.sync({ alter: true });
        console.log("✅ Database synchronized");
        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Unable to connect to database:", error);
        process.exit(1);
    }
};
startServer();
