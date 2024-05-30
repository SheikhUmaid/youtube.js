import connetDB from "./db/index.js";
import app from "./app.js"
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

connetDB().then(()=>{
    app.listen(process.env.PORT);
    console.log(`Server has been started at http://127.0.0.1:${process.env.PORT}`);
}).catch((error)=>{
    console.log("Error in connecting DB");
});
