const mongoose=require("mongoose");
const bookSchema=new mongoose.Schema({
    title:{type:String,require:true},
    ISBN:{type:String,requuire:true},
    author:{type:String,requuire:true},
    description:{type:String,requuire:true},
    publishDate:{type:String,requuire:true},
    publisher:{type:String,requuire:true},
})
module.export=mongoose.model("book",bookSchema)