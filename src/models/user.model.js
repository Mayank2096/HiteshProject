import mongoose from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"; 


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true

    },
    avatar: {
        type: String, //cloudinary url
        required: true
    },
    coverImage: {
        type: String, //cloudinary url
        required: true
    },
    password: {
        type: String,
        required: [true, "Password is required" ]
    },
    refreshToken: {
        type: String,
    },
    watchHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
},{timestamps: true});

////////////////////// SECURING PASSWORD ////////////////////
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10) // 10 -> means 10 rounds of hash . It is not fixed
    next();
})



//////////////// creating custom methods /////////////////////

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password, this.password); 
}


userSchema.methods.generateAccessToken = async function(){
            jwt.sign(
                {
                    _id: this._id,
                    email: this.email,
                    username: this.username
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY

                }
            )
}

userSchema.methods.generateRefreshToken = async function(){
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

/////////////////////////////////////////////////////////////
export const User= mongoose.Model("User", userSchema);