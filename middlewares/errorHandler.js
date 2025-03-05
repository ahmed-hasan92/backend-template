const errorHandler = async (err, req, res, next) => {
  res
    .status(err.statur || 500)
    .json(err.message || { message: 'Internal server error' });
};

module.exports = errorHandler;
