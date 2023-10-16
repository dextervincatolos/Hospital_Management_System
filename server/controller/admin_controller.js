const { response } = require('express');
var User = require('../model/admin_model');
const bcrypt = require('bcrypt');


exports.validate_login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
  
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id;
      res.redirect('/admin_dashboard');

      //res.send('Login successful');
    } else {
      res.send('Invalid username or password');
    }
  }