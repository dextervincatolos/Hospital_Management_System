const express = require('express');
const route = express.Router();


const services =require('../services/render');
const physiciancontroller = require('../controller/physician_controller');
const admincontroller = require('../controller/admin_controller');
const patientcontroller = require('../controller/patient_controller');

const isAuthenticated = require('../middleware/_isAuthenticated');

//admin Login
route.get('/admin_login',services.admin_login)
route.get('/admin_dashboard',isAuthenticated,services.admin_dashboard)
//------------------------------------------------------------------------------------------------

route.get('/physicians',isAuthenticated,services.physicians)
route.get('/view_physician',isAuthenticated,services.getphysicians)
route.get('/register_physician',isAuthenticated,services.new_physician)
route.get('/update_physician',isAuthenticated,services.update_physician)

//------------------------------------------------------------------------------------------------

route.get('/patients',isAuthenticated,services.patient)
route.get('/view_patient',isAuthenticated,services.getpatient)
route.get('/register_patient',isAuthenticated,services.new_patient)
route.get('/update_patient',isAuthenticated,services.update_patient)

//Physician Login----------------------------------------------------------------------------------

route.get('/physician_login',services.physician_login)
route.get('/physician_dashboard',isAuthenticated,services.physician_dashboard)

//Patient Login------------------------------------------------------------------------------------

route.get('/',services.patient_login)
route.get('/patient_dashboard',isAuthenticated,services.patient_dashboard)

//-------------------------------------------------------------------------------------------------

route.post('/login',admincontroller.validate_login);
route.post('/login_physician',physiciancontroller.login_physician);
route.post('/login_patient',patientcontroller.login_patient);

//API physician--------------------------------------------------------------------------------------

route.post('/api/physician',physiciancontroller.create_physician);
route.get('/api/physician',physiciancontroller.find_physician);
route.put('/api/physician/:id',physiciancontroller.update_physician);
route.delete('/api/physician/:id',physiciancontroller.delete_physician);

//API patient----------------------------------------------------------------------------------------

route.post('/api/patients',patientcontroller.new_patient);
route.get('/api/patients',patientcontroller.find_patient);
route.put('/api/patients/:id',patientcontroller.update_patient);
route.delete('/api/patients/:id',patientcontroller.delete_patient);

//Logout--------------------------------------------------------------------------------------------
route.get('/logout',services.logout);


module.exports = route;



