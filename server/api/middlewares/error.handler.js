module.exports = (err, _req, res, _next) => {
  console.error(err);
  // unhandled error, hide real error for security reasons
  if (!err.status || err.status >= 500) {
    res
      .status(500)
      .json({ message: 'Something went wrong, please try again later.' });
  } else {
    res
      .status(err.status)
      .json({ message: err.message, errors: err.errors || [] });
  }
};
