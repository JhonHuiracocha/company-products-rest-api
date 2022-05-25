import User from "../models/User";

export const addUser = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res
        .status(400)
        .json({ success: false, message: "The user already exists" });

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      isAdmin,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User added successfully",
      results: [savedUser],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the user",
      results: [],
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({ success: true, results: users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was an error getting the users",
      results: [],
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({
        success: false,
        message: "The user has not been found",
        results: [],
      });

    return res.status(200).json({ success: true, results: [user] });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was an error getting the user",
      results: [],
    });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, isAdmin } = req.body;

    const newUser = { username, email, password, isAdmin };

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({
        success: false,
        message: "The user has not been found",
        results: [],
      });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      results: [updatedUser],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
      results: [],
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res
        .status(404)
        .json({ success: false, message: "The user has not been found" });

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was an error removing the user",
    });
  }
};