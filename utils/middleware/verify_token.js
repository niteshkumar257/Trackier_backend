import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const header = req.headers.token;
    if (!header) return res.status(401).json({ error: "No header" });
    const token = header.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Not a valid token" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token" });

      req.user = user;
      next();
    });
  } catch (err) {}
};

export default verifyToken;
