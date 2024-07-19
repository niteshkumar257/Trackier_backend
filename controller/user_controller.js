import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { client } from "../db/config.js";

dotenv.config();

const create_username = (email, name) => {
  return name.slice(0, 4) + email.slice(0, 5);
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    console.log(user);

    if (!user) {
      return res.status(401).json({ error: "No User exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Register User
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log(email, password, name);

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExist.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await client.query(
        "INSERT INTO users (email, password,name) VALUES ($1, $2, $3) RETURNING *",
        [email, hashedPassword, name]
      );

      const user = result.rows[0];
      const { user_id } = user;

      const token = jwt.sign({ userId: user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res
        .status(201)
        .json({ message: "User registration successful", token: token });
    } else {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export { login, register };
