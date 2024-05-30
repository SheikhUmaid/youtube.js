import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import ApiResponse from "../utils/apiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
const registerUser = asyncHandler(async (req, res) => {



    const { fullName, username, password, email } = req.body;



    if ([fullName, username, password, email].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All Fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        console.log("This error took place");
        throw new ApiError(409, "User already exists");
    }


    //local system avatar
    const localFilePath = req.files?.avatar[0]?.path
    console.log("local file path: ", localFilePath);
    if(!localFilePath){
        throw new ApiError(401, "Error while uploading to local system")
    }
    console.log("local file path: ", localFilePath);


    //cloudinary avatar
    const uploadAvatar = await uploadOnCloudinary(localFilePath)
    if(!uploadAvatar){
        throw new ApiError(401, "Error while uploading to cloudinary")
    }




    const createdUser = await User.create({
        fullName: fullName,
        username: username,
        email: email,
        password: password,
        avatarImage: uploadAvatar.url,
    })
    
    
    if (!createdUser) {
        throw new ApiError(500, message = "Something went wrong while registering user");
    }
    console.log("cloudnary:  ",uploadAvatar);

    const user = await User.findById(createdUser._id).select("-password -refreshToken");

    console.log(user);
    return res.status(200).json(
        new ApiResponse(200, user, "User registered successfully")
    )
});



const loginUser = asyncHandler(async (req,res)=>{

    const {email,username,password} = req.body;

    if(!(email || username)){
        throw new ApiError(500,"Username or Email is required");
    }

    const user = await User.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(!user.isPasswordCorrect(password)){
        throw new ApiError(405,"User Credentials are incorrect");
    }

    


})
export { registerUser }   