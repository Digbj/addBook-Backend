const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    userName:{type:String,require:true},
    password:{type:String,requuire:true}
})
module.export=mongoose.model("user",userSchema)