const { response } = require('express');
var user_data = require('../model/user_model');

exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty!"});
        return;
    }

    //new user
    const user = new user_data({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        license: req.body.license,
        gender: req.body.gender,
        specialty: req.body.specialty,
        cnumber: req.body.cnumber,
        role: req.body.role
    }) 

    //save user in db

    user.save().then(data=>{
        res.redirect('/physicians')
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occured while executing operation!"
        });
    });

}


//retrieve and return all/single user

exports.find = (req,res)=>{

    if(req.query.id){
        const userid = req.query.id;
         user_data.findById(userid).then(data=>{

            if(!data){
                res.status(404).send({message: "ID User not found" + userid})
            }else{
                res.send(data)
            }
         }).catch(err=>{
            res.status(500).send({message:"Error retrieving user with ID "+ userid})
         })
    }else{

        user_data.find().then(userrecord=>{
            res.send(userrecord)
        }).catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while executing operation!"
            });
            
        });

    }
    
}

//update user via ID

exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Content cannot be empty!"});
    }

    const userid = req.params.id;
    user_data.findByIdAndUpdate(userid,req.body,{useFindAndModify:false}).then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update user with ${userid}.User not found!`})
        }else{
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({message:"Error Update user record"})
    })
}

//Delete user Via ID

exports.delete = (req,res)=>{

    const userid = req.params.id;

    user_data.findByIdAndDelete(userid).then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete user with id ${userid}. user not found!`})
        }else{
            res.send({message:"Deleted Successfully!"})
        }

    }).catch(err=>{
        res.status(500).send({message:"Could not delete User with id = "+id});
    });

}
