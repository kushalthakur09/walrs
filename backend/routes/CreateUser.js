const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt =require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="MyNameIsKushalRathoreThisIsMyWeb";
// SIGN-UP POST LOGIC---------------------------------->//

router.post(
  "/createuser",
  [
    body("email","invalid email").isEmail(),
    // password must be at least 5 chars long
    body("password","incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //validating user data before processing 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // hashing our password
    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);
    //creating new user
    try {
      await User.create({
        name:req.body.name,
        password:secPassword,
        email:req.body.email,
        location:req.body.location,
      });
      //return success if it is successfull
      res.json({ success: true });
    }catch (error) {
      console.log(error);

      res.json({ success: false });
    }
  }
);

// LOG-IN POST LOGIC--------------------------------->/
router.post(
  "/loginuser",
  [
    body("email","invalid email").isEmail(),
    // password must be at least 5 chars long
    body("password","incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //validating user data before processing 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let UserEmail=req.body.email;
    try {
      //Data of user is retrived using his/her email 

      let userData=await User.findOne({email:UserEmail})

      //if no data is  recieved than following code will be executed 

      if(!userData){
        return res.status(400).json({ errors:"Something Went Wrong Enter Valid Email "});
      }
      // this method compare entered password w/ hash password and return true or false respectively
      const isPasswordCorrect=await bcrypt.compare(req.body.password,userData.password);

      // checking if it is correct 

      if(!isPasswordCorrect){
        //return this if password is wrong
        return res.status(400).json({ errors:"Something Went Wrong Enter Valid  Password"});
      }
      const data={
        user:{
          id:userData.id
        }
      }
      //can add expire date for banking app
      const authToken=jwt.sign(data,jwtSecret);
      //return success if password was right 
      return res.json({ success: true,authToken:authToken });


    }catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
  }
);

module.exports = router;
// export default router;
// export{ router };
