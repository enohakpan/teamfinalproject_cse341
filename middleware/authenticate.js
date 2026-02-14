const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    res.status(401).json("Not authenticated");
    return;
  }
  next();
};

module.exports = {
  isAuthenticated
};