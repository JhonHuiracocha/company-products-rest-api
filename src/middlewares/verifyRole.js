import User from "../models/User";
import Role from "../models/Role";

export const isModerator = async (req, res, next) => {
  try {
    const { uid } = req;

    const user = await User.findById(uid);

    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    return res
      .status(403)
      .json({ success: false, message: "Require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const { uid } = req;

    const user = await User.findById(uid);

    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res
      .status(403)
      .json({ success: false, message: "Require Admin Role!" });

    next();
  } catch (error) {
    return res.status(500).send({ success: false, message: error });
  }
};
