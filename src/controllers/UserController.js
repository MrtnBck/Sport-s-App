const User = require("../models/User.js");
const bcrypt = require("bcrypt");

module.exports = {
    async store(req,res){
        try{
            const {email, password, firstName, lastName} = req.body;

            const existenUser = await User.findOne({email});

            if(!existenUser){
                const hashedPassword = await bcrypt.hash(password, 10); 
                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword
                });
                return res.json(user);
            }


            return res.status(400).json({
                message: "email/user already exist! Do you want to login instead?"
            });
            
            

        }catch(error){
             throw Error(`Error while registering a new User: ${error}`);
        }
    }
}