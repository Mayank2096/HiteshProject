import connectDB from "./db/connection.js";
import dotenv from "dotenv";
import { app } from "./app.js";


dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT, (req,res)=>{
        console.log(`Server is running at ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("Mongo DB Connection Failed due to ", error);
})