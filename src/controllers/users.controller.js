import User from "../models/User";

const addUser = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    const newUser = new User({ username, email, password, isAdmin });

    newUser.password = await User.encryptPassword(newUser.password);

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      results: [savedUser],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "An error occurred while adding the user",
      results: [],
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, results: users });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "There was an error getting the users",
      results: [],
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user)
      res.status(404).json({
        success: false,
        message: "The user has not been found",
        results: [],
      });

    res.status(200).json({ success: true, results: [user] });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "There was an error getting the user",
      results: [],
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, isAdmin } = req.body;

    const newUser = { username, email, password, isAdmin };

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });

    if (!updatedUser)
      res.status(404).json({
        success: false,
        message: "The user has not been found",
        results: [],
      });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      results: [updatedUser],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "An error occurred while updating the user",
      results: [],
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      res
        .status(404)
        .json({ success: false, message: "The user has not been found" });

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "There was an error removing the user",
    });
  }
};

export { addUser, getUsers, getUserById, updateUserById, deleteUserById };
