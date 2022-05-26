import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const payload = { uid };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const revalidateToken = async (req, res) => {
  try {
    const { uid } = req;

    const token = await generateToken(uid);

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({
      success: false,
      token: null,
      message: "An error occurred while revalidating the token",
    });
  }
};
