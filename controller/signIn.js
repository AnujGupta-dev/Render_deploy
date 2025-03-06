import User from "../model/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator";

export const signUp = async (req,res)=>{
    try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const{name,email,password,phoneno} = req.body;

            const existingUser = await User.findOne({email}) ;

            if(existingUser){
                return res.status(400).json({
                    sucess:false ,
                    message : "User already exist please login"
                })
            }

            let hashedPassword ;
            try{
                hashedPassword = await bcrypt.hash(password,10);
            }
            catch(err){
                res.status(500).json({
                    sucess:false,
                    message:"Error in hashing password   " + err.message
                })
            }

            let user = await User.create({name,email,password:hashedPassword,phoneno})
            res.status(200).json({
                message:"User created sucessfully",
                sucess:true,
                data:user ,
            });
    }
    catch(err){
        res.status(500).json({
            message :"User cannot be register,Please try again later  " + err.message ,
            sucess:false
        })
    }
}

export const login = async (req,res)=>{
    try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const{email,password} = req.body;

            if(!(email || password)){
                return res.status(400).json({
                    sucess:false,
                    message:"Please enter Email and Password"
                })
            }

            let user = await User.findOne({email});

            if(!user){
                return res.status(401).json({
                    sucess:false,
                    message:"User does not exist"
                })
            }

            const payload = {
                email : user.email,
                id : user._id,
            };

            if(await bcrypt.compare(password,user.password)){
                let token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:"24h"
                })

                user = user.toObject();
                user.token = token ;
                user.password = undefined;

                res.status(200).json({
                    user,
                    token,
                    sucess:true,
                    message:"User logged in sucessfully"
                })
            }
            else {
                // password not match
                return res.status(403).json({
                    success : false,
                    message : "Password does not match",
                })
            }
    }
    catch(err){
            res.status(500).json({
                message: "login failed " + err.message,
                sucess: false,

            })
    }
}