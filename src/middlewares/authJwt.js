import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token)
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
