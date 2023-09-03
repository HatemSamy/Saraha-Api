import usermodel from "../../../DB/model/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import AsyndHandler from "express-async-handler"
import { sendEmail } from "../../../services/sendEmail.js"
import cloudinary from "../../../services/cloudinary.js"

export const signup =AsyndHandler( async (req, res,next) => {

    const { email, password, userName } = req.body
    if (!req.file) {
        res.json({ message: "image is required " })

    }
    const user = await usermodel.findOne({ email }) // {} null
    if (user) {
        next(new Error("Email exist"))
    } else {
           const { public_id ,secure_url} = await cloudinary.uploader.upload(req.file.path,{ folder:`Saraha/User/${userName}` })
         
           console.log(secure_url);
        
        const newUser = await new usermodel({email,password,userName,profilepic:secure_url,imagePublicId:public_id})

        const token = await jwt.sign({ id: newUser._id }, process.env.tokenEmailSignature)
        const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
        const message = `
            <a href ='${link}'> Follow to activate u account <a/>
            `
        const info = await sendEmail(email, "ConfirmEmail", message)
        if (info?.accepted?.length) {
            const saveUser = await newUser.save()
            return res.status(200).json({ message: " add User successflly", saveUser })

        } 
    }

})

export const signin =AsyndHandler(async (req, res) => {

        const { email, password } = req.body
        const user = await usermodel.findOne({ email }) // {} null
        if (!user) {
            res.json({ message: "in-valid login data or email" })
        } else {
            if (!user.confirmEmail) {
                res.json({ message: "please confirm your email first" })
            } else {
                const match = await bcrypt.compare(password, user.password)
                if (!match) {
                    res.json({ message: "in-valid login data password" })
                }
                else {
                    const token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.toekenSignature)
                    res.json({ message: "login successfully", token })
                }
            }
        }


        res.json({ message: "catch error", error })
    
})


export const confirmEmail = AsyndHandler(async (req, res) => {

        const { token } = req.params
        const decoded =await jwt.verify(token, process.env.tokenEmailSignature)
        const user = await usermodel.updateOne({ _id: decoded.id, confirmEmail: false },
            { confirmEmail: true }, { new: true })
        if (!user) {
           return res.json({ message: "In-valid account or already confirmed" })
        }else{

            return res.json({ message: "your Email confirmed successfully" })
        }
      
   

}
)






