const mongoose =require('mongoose');

const items=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    item:{
        type:String,
        require:true,
    },
    flag:{
        type:String,
        require:true
    }
})

const item=mongoose.model("items",items);
module.exports=item;
