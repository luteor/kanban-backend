const sanitizer = require("sanitizer");

const bodySanitizer = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      req.body[body] = sanitizer.escape(req.body[key]);
    });
  }
  next();
};

module.exports = bodySanitizer;
