const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //we get the token by reading the url and split the whitespace (" ") and then put the token onto the second array [1].
    const token = req.headers.authorization.split(" ")[1];
    //we need to verify the token - we pass the token in with our secret code (found in routes/auth.js)
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "User is not authenticated!" });
  }
};
