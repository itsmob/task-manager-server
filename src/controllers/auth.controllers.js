import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRECT } from '../config.js';

export async function register(req, res) {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(['The email already is being used']);

    const passwordhash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: passwordhash,
      username,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      createdAT: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json([error.message]);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(['User not found']);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(['Incorrect password']);

    const token = await createAccessToken({ id: userFound._id });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json([error.message]);
  }
}

export function logout(req, res) {
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
}

export async function profile(req, res) {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json(['User not found']);

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
}

export async function verifyToken(req, res) {
  const { token } = req.cookies;

  if (!token) return res.status(401).json(['Unauthorired']);

  jwt.verify(token, TOKEN_SECRECT, async (err, user) => {
    if (err) return res.status(401).json(['Unauthorired']);

    const userFound = await User.findById(user.id);

    if (!userFound) return res.status(401).json(['Unauthorired']);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
}
