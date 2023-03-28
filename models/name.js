const mongoose=require('mongoose');


const nameSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
})

const name=mongoose.model("name",nameSchema);

module.exports=name;