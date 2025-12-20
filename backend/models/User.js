const { default: userEvent } = require("@testing-library/user-event");
const mongoose=require("mongoose");
const { Schema }=mongoose;
//  creating user Schema for our database
const UserSchema=new Schema({
    name:{
        type: String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        //setting default date as today for every user 
        default:Date.now
    }

});
const User=mongoose.model('User',UserSchema);
module.exports=User;