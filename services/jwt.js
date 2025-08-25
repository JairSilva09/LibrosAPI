import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("❌ JWT_SECRET no está definido en .env");
}

export const crearToken = (user) => {
  const payload = {
    id: user.id,
    nombre: `${user.nombre} ${user.apellido}`,
    email: user.email,
  };

  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const decodeToken = (token) => {
  return jwt.decode(token); 
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET); // valida firma y exp
  } catch (err) {
    return null; 
  }
};

