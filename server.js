const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');

const dbconnection = require('./server/database/connection');

const app = express();



dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log request
app.use(morgan('tiny'));

//database connection
dbconnection();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine", "pug");//if pug files are located just inside the views folder
//app.set("views",path.resolve(__dirname,"views/pug"))//if pug files are located in a folder inside views folder

//loading assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))

app.use(express.json());
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}));

//load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});