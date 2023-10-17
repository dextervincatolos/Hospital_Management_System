const { response } = require('express');
var sysadmin = require('../model/admin_model');
const bcrypt = require('bcrypt');


exports.validate_login = async (req, res) => {
    const { username, password } = req.body;
    const admin_data = await sysadmin.findOne({ username });
  
    if (admin_data && await bcrypt.compare(password, admin_data.password)) {
        req.session.uid = admin_data._id;
        req.session.username = admin_data.username;
        req.session.role = 'admin';
        res.redirect('/admin_dashboard');

      //res.send('Login successful');
    } else {
      res.send('Invalid username or password');
    }
  }
