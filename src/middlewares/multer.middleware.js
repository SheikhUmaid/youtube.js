import multer from "multer";
import {UUID} from "uuidjs"
import path from "path"
// import { uploadOnCloudinary } from "../utils/cloudinary";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./public/uploads/temp");
    },
    filename:function(req,file,cb){
        const uid = UUID.generate()
        cb(null,`uploadfile.${file.originalname}${uid}${path.extname(file.originalname)}`);
    }
})

export const upload = multer(
    {
        storage:storage
    }
)