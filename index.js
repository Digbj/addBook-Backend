const express=require("express");
const mongoose=require("mongoose");
const cors=require('cors');

// const cors=require(cors());
const port=8080;
// const userRoute=require('./Routes/user')
// const bookRoute=require('./Routes/book')
const url="mongodb+srv://digbj:digbj@cluster0.6oqbzya.mongodb.net/book"
// const url="mongodb://0.0.0.0:27017"
const app=express();



mongoose.connect(url)
.then(()=>{console.log("Connected to dB")})
.catch((err)=>{console.log(err)})

app.use(cors());
app.use(express.json())
app.use(express.urlencoded());


const bookSchema=new mongoose.Schema({
    title:{type:String,require:true},
    ISBN:{type:String,requuire:true},
    author:{type:String,requuire:true},
    description:{type:String,requuire:true},
    publishDate:{type:String,requuire:true},
    publisher:{type:String,requuire:true},
})
module.export=mongoose.model("book",bookSchema)

const userSchema=new mongoose.Schema({
    userName:{type:String,require:true},
    password:{type:String,requuire:true}
})
module.export=mongoose.model("user",userSchema)




app.get('/home',(req,res)=>{
    res.status(200).json("hello")
})

app.post("/register",async (req,res)=>{
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

app.post("/login", async (req,res)=>{
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


//-----------------book api========================================
app.get("/addbook", async(req,res)=>{
    const newBook= new book(req.body);
    try{
        const savedBook=await newBook.save();
        res.status(200).json(savedBook);
    }catch(err){
        res.status(500).json(err);
    }
})

app.delete('/deleteBook', async(req,res)=>{
    try{
        await book.findByIdAndDelete(req.params.id);
        res.status(200).json("video deleted");

    }catch(err){
        res.status(500).json(err);
    }
});

app.patch('/updateBook',async(req,res)=>{
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




// app.use('/api/user',userRoute);
// app.use('/api/book',bookRoute);

app.listen(port,()=>{
    console.log("server is live at 8080")
})