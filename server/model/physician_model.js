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
    license:{
        type:'string',
        unique:true,
        required:true
    },
    gender:{
        type:'string',
        required:true
    },
    specialty:{
        type:'string',
        required:true
    },
    cnumber:{
        type:'number',
        required:true
    },
    status:{
        type:'string',
        default: 'off-duty'
    },
    username:{
        type:'string',
        default:'Physician'
    },
    password:{
        type:'string',
        required:true,
        unique:true
    }



})

module.exports = mongoose.model('physician_collection', Schema);