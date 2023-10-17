const mongoose =require("mongoose");

var Schema = new mongoose.Schema({

    firstname:{
        type:'string',
        required:true
    },
    lastname:{
        type:'string',
        required:true
    },
    gender:{
        type:'string',
        required:true
    },
    birthday:{
        type:'date',
        required:true
    },
    cnumber:{
        type:'number',
        required:true
    },
    ecnumber:{
        type:'number',
        required:true
    },
    status:{
        type:'string',
        default: 'off-duty'
    },
    physician:{
        type:'string',
        required:true
    },
    username:{
        type:'string',
        required:true
    },
    password:{
        type:'string',
        required:true,
        unique:true
    }
})

module.exports = mongoose.model('patient_collection', Schema);