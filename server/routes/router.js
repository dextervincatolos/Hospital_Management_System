
const express = require('express');
const route = express.Router();


const services =require('../services/render');
const controller = require('../controller/user_controller');



route.get('/',services.home)

route.get('/physicians',services.physicians)

route.get('/register_physician',services.new_physician)

route.get('/update_physician',services.update_physician)

route.get('/register_patient',services.new_patient)




//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports = route;