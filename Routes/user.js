const express=require("express");
const user=require("../Schema/user");
const router=express();

router.get("/home",(req,res)=>{
    res.send("hello");
})
router.post("/register",async (req,res)=>{
    const newUser= new user({
        userName:req.body.userName,
        password:req.body.password
    });
    try{
        const savedUser=await newUser.save();
        res.status(200).json(savedUser);
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

router.post("/login", async (req,res)=>{
    try{
        const user=await user.findOne({userName:req.body.userName});
        if(!user){
            return res.status(401).json("Wrong Credential")
        }else{
            return res.status(200).json("Login Sucessful")
        }
    }
    catch (err){
        res.status(500).json(err)
    }
})
