const mongoose =require('mongoose');


const UserSchema=new mongoose.Schema({
    Email:{
    type:String,
    require:true
    },
    Username:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    }
});

const user= mongoose.model("Users", UserSchema);
module.exports=user;