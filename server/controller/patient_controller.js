const { response } = require('express');
var patient = require('../model/patient_model');
const bcrypt = require('bcrypt');

exports.new_patient = async (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty!"});
        return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new patient with the hashed password
    const newPatient = new patient({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        birthday: req.body.birthday,
        cnumber: req.body.cnumber,
        ecnumber: req.body.ecnumber,
        status: req.body.status,
        physician: req.body.physician,
        username: req.body.username,
        password: hashedPassword,
    });

    newPatient.save().then(data=>{
        res.redirect('/patients')
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occured while executing operation!"
        });
    });
}

 //retrieve and return all/single user

exports.find_patient = (req,res)=>{

    if(req.query.id){
        const patientid = req.query.id;
         patient.findById(patientid).then(data=>{

            if(!data){
                res.status(404).send({message: "ID User not found" + patientid})
            }else{
                res.send(data)
            }
         }).catch(err=>{
            res.status(500).send({message:"Error retrieving user with ID "+ patientid})
         })
    }else{

        patient.find().then(patientrecord=>{
            res.send(patientrecord)
        }).catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while executing operation!"
            });
            
        });

    }
    
}

exports.update_patient = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const patientId = req.params.id;
    
    // Check if a new password is provided
    if (req.body.password) {
        // Hash the new password
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    patient.findByIdAndUpdate(patientId, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `Cannot Update user with ${patientId}. Patient not found!` });
        } else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({ message: "Error Update Patient record" });
    });
}

//Delete user Via ID

exports.delete = (req,res)=>{

    const patientid = req.params.id;

    patient.findByIdAndDelete(patientid).then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete user with id ${patientid}. Patient not found!`})
        }else{
            res.send({message:"Deleted Successfully!"})
        }

    }).catch(err=>{
        res.status(500).send({message:"Could not delete User with id = "+id});
    });

}
