
const express = require('express');
const route = express.Router();


const services =require('../services/render');
const controller = require('../controller/user_controller');
const admincontroller = require('../controller/admin_controller');
const isAuthenticated = require('../services/_isAuthenticated');

//admin Login
route.get('/admin_login',services.admin_login)

route.get('/admin_dashboard',isAuthenticated,services.admin_dashboard)

route.get('/physicians',services.physicians)
route.get('/register_physician',services.new_physician)
route.get('/update_physician',services.update_physician)





route.get('/register_patient',services.new_patient)




//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

route.post('/login',admincontroller.validate_login);

module.exports = route;