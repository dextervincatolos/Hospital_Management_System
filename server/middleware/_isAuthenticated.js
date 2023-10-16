const isAuthenticated = (req, res, next) => {
  if (req.session.uid) {
    return next(); // User is authenticated, continue to the next middleware or route handler
  }
  res.redirect('/'); // User is not authenticated, redirect to the login page
};

module.exports = isAuthenticated;