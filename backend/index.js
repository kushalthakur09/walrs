const express=require('express');
const mongoDB=require("./db");
const bodyParser=require("body-parser");
const createRouter=require('./routes/CreateUser');
const displayRouter=require("./routes/DisplayData");
const OrderRouter=require("./routes/OrderData");
// creating  app 
const app=express();

app.use(bodyParser.json());
//connecting database
mongoDB();

// home route getting request 
app.get("/",(req,res)=>{
    res.send("hello welcome to the server");
})
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept"
    );
    next();
})
app.use(express.json())

app.use('/api',createRouter);
app.use('/api',displayRouter)
app.use('/api',require("./routes/OrderData"));
  
// listing on port 5000
app.listen(5000,()=>{
    console.log("server is up and running on port 5000")
})