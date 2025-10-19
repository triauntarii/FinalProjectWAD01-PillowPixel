"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = exports.login = void 0;
const user_1 = require("../models/user");
// Untuk Login, check dahulu apakah ada user existing
const login = async (req, res) => {
    try {
        // const user = await User.findByPk(req.params.id);
        const user = await user_1.User.findOne({
            where: { username: req.body.username },
        });
        if (!user) {
            res.status(404).json({ message: "User tidak ditemukan" });
            return;
        }
        console.log(user);
        if (user.username !== req.body.username) {
            res.status(401).json({ message: "Username Salah!" });
            return;
        }
        if (user.password !== req.body.password) {
            res
                .status(401)
                .json({ message: "Silakan masukkan kata sandi yang benar!" });
            return;
        }
        await user.update(req.body);
        res.json({
            email: user.email,
            username: user.username,
            isAdmin: user.is_admin,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.login = login;
// Digunakan untuk createUser jika hit end point /register
const createUser = async (req, res) => {
    try {
        const { username, email, password, is_admin } = req.body;
        console.log(username);
        const checkUser = await user_1.User.findOne({
            where: { username: req.body.username },
        });
        console.log(checkUser);
        if (checkUser) {
            res.status(404).json({
                message: "There is a user that uses this Username, please change Username",
            });
            return;
        }
        const user = await user_1.User.create({
            username,
            email,
            password,
            is_admin: is_admin || 0,
        });
        res.status(201).json({
            message: "User created successfully",
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                is_admin: user.is_admin,
            },
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createUser = createUser;
// Jika ingin lihat semua user, tanpa perlu akses database. tidak terlalu diperlukan
const getAllUsers = async (_req, res) => {
    try {
        const users = await user_1.User.findAll({
            attributes: { exclude: ["password"] },
        });
        res.json({
            message: "Users retrieved successfully",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllUsers = getAllUsers;
// Dapat digunakan jika ingin mencari spesific user berdasarkan user id
const getUserById = async (req, res) => {
    try {
        const user = await user_1.User.findByPk(req.params.id, {
            attributes: { exclude: ["password"] },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUserById = getUserById;
// Jika ingin ada fitur update data user, dapat mengupdate email atau change password. lebih baik username atau user id jangan di update
const updateUser = async (req, res) => {
    try {
        const user = await user_1.User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await user.update(req.body);
        res.json({
            message: "User updated successfully",
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                is_admin: user.is_admin,
            },
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateUser = updateUser;
// Jika ingin hapus akun
const deleteUser = async (req, res) => {
    try {
        const user = await user_1.User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await user.destroy();
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteUser = deleteUser;
