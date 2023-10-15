const axios = require('axios');


exports.home= (req, res) => {
    //res.render('login',{title:"HMS | Login Page",message:"Im a PUG!"});
    res.render('admin/admin_dashboard',{title:"HMS | Admin Dashboard"});
    //res.render('admin/admin_view_doctors',{title:"HMS | Doctors page"});
    //res.render('admin/admin_view_patients',{title:"HMS | Patients page"});
    //res.render('admin/register_physician',{title:"HMS | Register Physician"});
    //res.render('admin/register_patient',{title:"HMS | Register Patient"});
}

exports.new_physician = (req, res) => {
        res.render('admin/register_physician',{title:"HMS | Physician Registration Page"});   
}

exports.physicians = (req, res) => {
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        res.render('admin/admin_view_doctors',{title:"HMS | Physicians Page",physicians:response.data});
    }).catch(err=>{
        res.send(err);
    }) 
}

// exports.update_physician = (req, res) => {
//     res.render('admin/update_physician',{title:"HMS | Physician Update Page"});   
// }

exports.update_physician= (req, res) => {
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}}).then(function(physicianData){
        res.render('admin/update_physician',{title:"HMS | Physician Update Page",user:physicianData.data})
    }).catch(err=>{res.send(err);
    })
}






















exports.new_patient = (req, res) => {
    res.render('admin/register_patient',{title:"HMS | Register Patient"});
}