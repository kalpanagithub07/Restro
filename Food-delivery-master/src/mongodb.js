const mongoose = require('mongoose');  //import mongoose

mongoose.connect('mongodb://127.0.0.1:27017/loginData')  //connect to mongodb which has default localhost 127.0.0.1/27017 followed by /database_name
.then(() => {
    console.log("MongoDB connected");  //verifying connection
})
.catch(() => {
    console.log("Failed to connect");  //couldn't connect
})

const schema = new mongoose.Schema({   //define the schema
    name:{                             // name data of type string
        type:String,
        required:true
    },
    password:{
        type:String,                   //password of type string
        required:true
    }
});


const collection = new mongoose.model("collection1", schema)

module.exports = collection   // export to import in index.js