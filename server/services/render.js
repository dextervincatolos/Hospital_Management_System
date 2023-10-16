const axios = require('axios');
var User = require('../model/admin_model');

exports.admin_login = (req, res) => {
    res.render('admin/admin_login',{title:"HMS | Administrator Login Page"});   
}

exports.admin_dashboard = async (req, res) => {
    try {
      const userId = req.session.userId;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).send('User not found');
      }
      
      res.render('admin/admin_dashboard', {title:"HMS | Admin Dashboard",user });
    } catch (error) {
      return res.status(500).send(error.message);
    }
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