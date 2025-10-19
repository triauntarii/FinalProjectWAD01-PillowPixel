import { Request, Response } from "express";
import { User } from "../models/user";

// Untuk Login, check dahulu apakah ada user existing
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // const user = await User.findByPk(req.params.id);
    const user = await User.findOne({
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Digunakan untuk createUser jika hit end point /register
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password, is_admin } = req.body;

    console.log(username);

    const checkUser = await User.findOne({
      where: { username: req.body.username },
    });

    console.log(checkUser);

    if (checkUser) {
      res.status(404).json({
        message:
          "There is a user that uses this Username, please change Username",
      });
      return;
    }

    const user = await User.create({
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Jika ingin lihat semua user, tanpa perlu akses database. tidak terlalu diperlukan
export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Dapat digunakan jika ingin mencari spesific user berdasarkan user id
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id, {
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Jika ingin ada fitur update data user, dapat mengupdate email atau change password. lebih baik username atau user id jangan di update
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id);

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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Jika ingin hapus akun
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
