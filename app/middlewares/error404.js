const error404 = (req, res) => {
  res.status(404).send("404 Not Found");
};

module.exports = error404;
