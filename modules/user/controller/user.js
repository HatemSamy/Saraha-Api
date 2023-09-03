

import { usermodel } from "../../../DB/model/user.model.js"
import AsyndHandler from "express-async-handler"
import cloudinary from "../../../services/cloudinary.js"



export const userprofile =AsyndHandler(async (req,res)=>{

    const profile= await usermodel.findById(req.user._id)
     res.json({massage:"done",profile})
    
    })
export const GetShareProfile  =  AsyndHandler(async (req, res) => {
    const user = await usermodel.findById(req.params.id).select("userName profilepic")
   user? res.json({ message: "Done User Profile", user}):res.json({ message: "not fou d user"})
})




export const    UpdateProfile  =AsyndHandler(async (req, res,next) => {

     const {lName,fName,userName}=req.body

     const User= await usermodel.findById(req.user._id)
    if (req.file) {
        const { public_id ,secure_url} = await cloudinary.uploader.upload(req.file.path,{ folder:`Saraha/User/${userName}` })
        req.body.imagePublicId=public_id 
        req.body.profilepic=secure_url

    }
    const userUpdate = await usermodel.findByIdAndUpdate(req.user._id,req.body,{new:true})
    console.log(userUpdate);
    if (userUpdate) {
        const image = await cloudinary.uploader.destroy(User.imagePublicId)
        
    }
    userUpdate? res.json({ message: " User Profile updated successfully", userUpdate}):res.json({ message: "fail to update"})

})