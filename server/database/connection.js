const mongoose = require('mongoose');

const dbconnection = async()=>{
    try{
        // database connection string
        const dbcon = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`Database Connected:${dbcon.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = dbconnection