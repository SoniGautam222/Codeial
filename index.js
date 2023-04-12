const express= require('express');
const app=express();
const port = 8000;
// using express router
app.use('/',require('./routes'));


app.set('view engine', "ejs");
app.set('views','./views')

app.listen(port,function(err){
    if(err){
        // console.log('Error : ', err);
        console.log(`Error in running the server : ${port}`);
    }else{
        console.log(`Server is running on the port : ${port}`);
    }
})