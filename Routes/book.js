const express=require('express');
const book=require('../Schema/book');
// const { routes } = require('./user');
const router=express.Router();


router.get("/addbook", async(req,res)=>{
    const newBook= new book(req.body);
    try{
        const savedBook=await newBook.save();
        res.status(200).json(savedBook);
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete('/deleteBook', async(req,res)=>{
    try{
        await book.findByIdAndDelete(req.params.id);
        res.status(200).json("video deleted");

    }catch(err){
        res.status(500).json(err);
    }
});

router.patch('/updateBook',async(req,res)=>{
    try{
        const updateBook=await book.findByIdAndUpdate(
            req.params.id,{
                $set:req.body
            },{new:true});
            res.status(200).jsonjson(updateBook);

    }catch(err){
        res.status(500).json(err.message);
    }
})

module.exports=router