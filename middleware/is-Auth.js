module.exports = (req, res, next) => {
  if (!req.session.data) {
      return res.send('false');
  }
  next();
}
