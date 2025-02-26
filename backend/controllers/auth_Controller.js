import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

// ------------------------------------------------------------------------------------------------------------------------
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required for registration."
            });
        }

        const isUserAlreadyExist = await User.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(409).json({  success: false, message: "User already exists. Please sign in." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const email_verification_code = Math.floor(1000 + Math.random() * 9000).toString();

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            email_verification_code,
        });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "🎉 Successfully registered! Please check your email for verification."
        });

    } catch (error) {
        console.error("Signup Error:", error); 
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};

// ------------------------------------------------------------------------------------------------------------------------
export const login = async (req, res) =>{
    try {
        const { email, password } = req.body;
        if(!email || !password ){
            return res.status(400).json({success:false, message:"email or password is empty"});
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({success:false, message:"Email is not Registered"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        
        res.status(200).cookie('a_x_is', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            path: '/',
            sameSite: "strict",
        }).json({ success: true, message: "Login successful", token });

    } catch (error) {
        res.status(500).json({success:false, message:"internal server error"})
    }
}

// ------------------------------------------------------------------------------------------------------------------------
export const verifyAccountReq = async (req, res)=>{
}
// -------------------------------------------------------------------------------------------------------------------------
export const verifyAccount = async (req, res)=>{ 

}
// ------------------------------------------------------------------------------------------------------------------------
export const forgetPassword = async (req, res)=>{

}

