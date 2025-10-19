import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

// User routes

//Login

// Setiap endpoint memiliki function masing-masing, ada endpoint login yang menggambil function login dari folder userCOntroller
// Ada endpoint resgiter yang menggambil function login dari folder createUser
// Jadi saat memanggil di Front End akan hit endpoint yang berbeda2
// Contoh Login : http://localhost:5000/api/users/login
// Contoh Register : http://localhost:5000/api/users/register
router.post("/login", userController.login); // Create user
router.post("/register", userController.createUser); // Create user
router.get("/", userController.getAllUsers); // Get all users
router.get("/:id", userController.getUserById); // Get user by ID
router.put("/:id", userController.updateUser); // Update user
router.delete("/:id", userController.deleteUser); // Delete user

export default router;
