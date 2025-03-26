import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    console.log(req.body);
    
    const {first_name, last_name, email, password} = req.body;
    
    try {

        const checkEmail = await User.exists({email});
        
        if(checkEmail){
            return res.status(409).json({message : 'Email already exist in database'})
        }else{

            const salt = bcrypt.genSaltSync(5);
            const hashPassword = bcrypt.hashSync(password, salt);

            await User.create({
                first_name,
                last_name,
                email,
                password : hashPassword
            });

            return res.status(201).json({message : `User ${first_name} successfully created !`})
        }


    } catch (error) {
        return res.status(500).json({ message : `Internal server error`, error})
    }
}

export const login =  async (req, res) => {

    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({ email })

        if(!user) return res.status(401).json({ message : 'Email or password invalid'})
            
        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword) return res.status(401).json({ message : 'Email or password invalid'})

        const token = jwt.sign({id: user._id}, JWT_SECRET)
        return res.status(200).json({ message : `Welcome ${user.first_name}` ,token : token})

    } catch (error) {
        return res.status(500).json({ message : `Internal server error`, error})
    }
}