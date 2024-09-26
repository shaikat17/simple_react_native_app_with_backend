import jwt from "jsonwebtoken";

const createToken = async (user) => {
  const token = await jwt.sign({ id: user._id }, process.env.jwt_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if authorization header exists and starts with 'Bearer'
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Authentication Invalid." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
      // Verify the JWT using the secret
    const payload = jwt.verify(token, process.env.jwt_SECRET);
        // Attach the user data (e.g., userId) to the request object
        req.user = { userId: payload.id };

        next(); // Pass control to the next middleware
  } catch (error) {
        return res.status(401).json({ message: "Authentication Invalid." });
  }
};

export { createToken, auth };
