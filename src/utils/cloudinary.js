import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from "fs"

// import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dztnxcwk1', 
  api_key: '565515449483534', 
  api_secret: 'aGWP9krZ1sZcEDwsfba8-6uOmhs' 
});



const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",

        });
        //file has been uploaded successfully,
        console.log("file has been uploaded successfully");
        console.log(response)
        return response;
    } catch (error) {
        log("something went wrong while iploading")
        fs.unlinkSync(localFilePath)
        log(error)
        return null;
    }
}





export {uploadOnCloudinary}