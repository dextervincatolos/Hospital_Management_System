const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log request
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine", "pug");//if pug files are located just inside the views folder
//app.set("views",path.resolve(__dirname,"views/pug"))//if pug files are located in a folder inside views folder

//loading assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))

app.get('/', (req, res) => {
    //res.render('login',{title:"HMS | Login Page",message:"Im a PUG!"});
    //res.render('admin/admin_dashboard',{title:"HMS | Admin Dashboard"});
    //res.render('admin/admin_view_doctors',{title:"HMS | Doctors page"});
    //res.render('admin/admin_view_patients',{title:"HMS | Patients page"});
    //res.render('admin/register_physician',{title:"HMS | Register Physician"});
    res.render('admin/register_patient',{title:"HMS | Register Patient"});


})

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});