import { Router } from 'express'
import * as authController from './controller/auth.js'
import multer from 'multer'
import { fileValidation, myMulter } from '../../services/multer.js'
import { validation } from '../../middelwear/Validation.js'
import * as Validators from "./auth.validation.js"
const router = Router()



router.get("/", (req, res) => {
    res.json({ message: "Auth module" })
})


router.post("/signup",validation(Validators.signup),myMulter(fileValidation.image).single("image"),authController.signup)

router.get("/confirmEmail/:token",authController.confirmEmail)

router.post("/login",validation(Validators.login),authController.signin)



export default router