import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app= express();

////////////////////// MIDDLEWARES //////////////////////////
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ // for parsing of nested objects
    extended: true,
    limit: "16kb"   
}))
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({
    origin:  process.env.CORS_ORIGIN,
    credentials: true
}));


//////////////////// Router ///////////////////////////////////

import userRouter from "./routes/user.router.js";

// passing to router THROUGH MIDDLEWARE
app.use("/api/v1/users",userRouter);

// http://localhost:8000/api/v1/users/<in_router_file>
export default app ;