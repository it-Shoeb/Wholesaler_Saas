import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
  try {
    const reqToken = req.cookies.token;

    if (!reqToken && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(` `)[1];
      console.log(req.headers);
    }

    if (!reqToken) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: not token provided or Expired Token",
      });
    }

    const decoded = jwt.verify(reqToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
  }
};

export default authentication;
