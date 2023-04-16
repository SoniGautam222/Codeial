const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');



const db=mongoose.connection;

db.on('error',console.error.bind(console, "Error connecting to the database"));

db.once('open',function(){
    console.log("connectted to the database : : Mongo Db");
});

module.exports=db;