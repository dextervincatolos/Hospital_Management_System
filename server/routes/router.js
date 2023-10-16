

const express = require('express');
const route = express.Router();


const services =require('../services/render');
const controller = require('../controller/user_controller');
const admincontroller = require('../controller/admin_controller');
const patientcontroller = require('../controller/patient_controller');

const isAuthenticated = require('../middleware/_isAuthenticated');

//admin Login
route.get('/admin_login',services.admin_login)

route.get('/admin_dashboard',isAuthenticated,services.admin_dashboard)

route.get('/physicians',isAuthenticated,services.physicians)
route.get('/register_physician',isAuthenticated,services.new_physician)
route.get('/update_physician',isAuthenticated,services.update_physician)

route.get('/logout',services.logout);

//physician Login
route.get('/physician_login',services.physician_login)

//patient Login
route.get('/',services.patient_login)

route.get('/register_patient',isAuthenticated,services.new_patient)
route.get('/patients',isAuthenticated,services.patient)
route.get('/update_patient',isAuthenticated,services.update_patient)




//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

route.post('/login',admincontroller.validate_login);

//AAPI patients
route.post('/api/patients',patientcontroller.new_patient);
route.get('/api/patients',patientcontroller.find_patient);
route.put('/api/patients/:id',patientcontroller.update_patient);
route.delete('/api/patients/:id',patientcontroller.delete);
 





module.exports = route;



