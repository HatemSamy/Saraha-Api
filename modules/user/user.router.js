import { Router } from 'express'

import * as userController from './controller/user.js'
import { auth } from '../../middelwear/auth.js'
import { fileValidation, myMulter } from '../../services/multer.js'

const router = Router()



router.get("/",auth() ,userController.userprofile)
router.get("/:id", userController.GetShareProfile)
router.put("/",auth(),myMulter(fileValidation.image).single("image"),userController.UpdateProfile)

export default router