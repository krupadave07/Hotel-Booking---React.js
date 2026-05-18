import jwt from "jsonwebtoken";

/* ================= VERIFY USER ================= */

export const verifyUser = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Try primary secret first
    const primary = process.env.JWT_SECRET;
    let decoded;

    if (primary) {
      try {
        decoded = jwt.verify(token, primary);
      } catch (e) {
        // fallback to legacy secret for tokens issued before secret rotation
        try {
          decoded = jwt.verify(token, "secret123");
          console.warn("verifyUser: token verified with legacy secret");
        } catch (e2) {
          throw e2;
        }
      }
    } else {
      decoded = jwt.verify(token, "secret123");
    }

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }

};


/* ================= VERIFY ADMIN ================= */

export const verifyAdmin = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const primary = process.env.JWT_SECRET;
    let decoded;

    if (primary) {
      try {
        decoded = jwt.verify(token, primary);
      } catch (e) {
        try {
          decoded = jwt.verify(token, "secret123");
          console.warn("verifyAdmin: token verified with legacy secret");
        } catch (e2) {
          throw e2;
        }
      }
    } else {
      decoded = jwt.verify(token, "secret123");
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.admin = decoded;
    next();

  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }

};