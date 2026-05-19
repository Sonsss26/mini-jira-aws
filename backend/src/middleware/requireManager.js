const requireManager = (req, res, next) => {
  if (req.user?.role !== "manager") {
    return res.status(403).json({ message: "Manager access required" });
  }
  next();
};

module.exports = requireManager;
