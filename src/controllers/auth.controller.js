import User from "../models/User";
import Role from "../models/Role";

import { generateToken } from "../helpers/jwt";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(404).json({
        success: false,
        token: null,
        message: "The user has not been found",
      });

    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword)
      return res
        .status(401)
        .json({ success: false, token: null, message: "Invalid password" });

    const token = await generateToken(userFound._id);

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      token: null,
      message: "An error occurred while logging in",
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        success: false,
        token: null,
        message: "The user already exists",
      });

    const role = await Role.findOne({ name: "user" });

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      roles: [role._id],
    });

    const savedUser = await newUser.save();

    const token = await generateToken(savedUser._id);

    return res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      token: null,
      message: "An error occurred while registering the user",
    });
  }
};
