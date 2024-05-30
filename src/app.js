import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();



app.use(cors({
    origin: process.env.ALLOWED_ORIGINS,
    credentials:true
}));

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static("public"))


//routes


import userRouter from "./routes/user.routes.js"
app.use("/api/v1/user", userRouter)


export default app;