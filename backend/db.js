const mongoose=require("mongoose");
// database ATLAS url 
 const dbURL ="mongodb+srv://goFood:babakijhaki@cluster0.zrqybm1.mongodb.net/gofoodDB?retryWrites=true&w=majority";
// const dbURL="mongodb://goFood:babakijhaki@ac-gwcsjxd-shard-00-00.zrqybm1.mongodb.net:27017,ac-gwcsjxd-shard-00-01.zrqybm1.mongodb.net:27017,ac-gwcsjxd-shard-00-02.zrqybm1.mongodb.net:27017/gofoodDB?ssl=true&replicaSet=atlas-11k43n-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB =async() =>{
  try{
  // creating mongoose connection
  await mongoose.connect(dbURL);
    console.log("connected")
    //fetching data from database colletion name
    const fetch_data= await mongoose.connection.db.collection("food_items");
    const data= await fetch_data.find({}).toArray().then((data)=>{
      global.food_items = data;
    })
  
     ///after food data food category will be retrived   
    .then(async ()=>{
    const foodCategory=await mongoose.connection.db.collection("food_category");
     await foodCategory.find({}).toArray()

     //then food category is stored in global variable to be accessed from anywhere
    .then((catData)=>{
         global.food_category=catData;
    })})

    .catch((err)=>{
      console.log(err);
    })
    // console.log(data);  
    // console.log(global.food_items)
  } catch(err){
      console.log("error:",err);
    }
};
//export module
module.exports = mongoDB;
