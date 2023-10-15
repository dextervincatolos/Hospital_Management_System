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
    role:{
        type:'string',
        default:'Physician'
    }



})

module.exports = mongoose.model('user_collection', Schema);