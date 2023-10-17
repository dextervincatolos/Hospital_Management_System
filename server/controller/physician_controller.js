const { response } = require('express');
var physician_data = require('../model/physician_model');

const bcrypt = require('bcrypt');




//create a new record------------------------------------------------------------------------------------------------

exports.create_physician = async (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty!"});
        return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //new user
    const user = new physician_data({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        license: req.body.license,
        gender: req.body.gender,
        specialty: req.body.specialty,
        cnumber: req.body.cnumber,
        username: req.body.username,
        password: req.body.password
    }) 

    user.save().then(data=>{
        res.redirect('/physicians')
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occured while executing operation!"
        });
    });
}


//retrieve and return all/single user------------------------------------------------------------------------------------

exports.find_physician = (req,res)=>{

    if(req.query.id){
        const physician = req.query.id;
         physician_data.findById(physician).then(data=>{

            if(!data){
                res.status(404).send({message: "Physician not found" + physician})
            }else{
                res.send(data)
            }
         }).catch(err=>{
            res.status(500).send({message:"Error retrieving Physician with ID "+ physician})
         })
    }else{

        physician_data.find().then(physicianrecord=>{
            res.send(physicianrecord)
        }).catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while executing operation!"
            });
            
        });

    }
    
}

//Update Record -----------------------------------------------------------------------------------------------------------
exports.update_physician = async (req, res) => {
    if(!req.body){
        return res.status(400).send({message:"Content cannot be empty!"});
    }

    const pid = req.params.id;
    
    // Check if a new password is provided
    if (req.body.password) {
        // Hash the new password
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    physician_data.findByIdAndUpdate(pid,req.body,{useFindAndModify:false}).then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update Physician with ${pid}.Physician not found!`})
        }else{
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({message:"Error Update Physician record"})
    })
}

//Delete Physician----------------------------------------------------------------------------------------------------------

exports.delete_physician = (req,res)=>{

    const pid = req.params.id;

    physician_data.findByIdAndDelete(pid).then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete Physician with id ${pid}. physician not found!`})
        }else{
            res.send({message:"Deleted Successfully!"})
        }

    }).catch(err=>{
        res.status(500).send({message:"Could not delete Physician with id = "+id});
    });

}

//Login-----------------------------------------------------------------------------------------------------------------------
  
exports.login_physician = async (req, res) => {
    const { username, password } = req.body;
    const physician = await physician_data.findOne({ username });
  
    if (physician && await bcrypt.compare(password, physician.password)) {
        req.session.uid = physician._id;
        req.session.username = physician.username;
        req.session.license = physician.license;
        req.session.role = 'physician';

        // Update status to "on-duty"
        await physician_data.updateOne({ _id: physician._id }, { $set: { status: 'on-duty' } });

        res.redirect('/physician_dashboard');
        //res.send('Login successful');
    } else {
      res.send('Invalid username or password');
    }
  }