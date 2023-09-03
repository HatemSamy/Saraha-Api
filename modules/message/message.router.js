import { Router } from 'express'
import * as MessageController from "./controller/massage.js"
import { auth } from '../../middelwear/auth.js'
import { validation } from '../../middelwear/Validation.js'
import * as validators from "./message.validation.js"
const router = Router()


router.post("/:recieverId",validation(validators.SendMessage),MessageController.SendMessage)

router.get("/",auth(),MessageController.GetMessage)
router.delete("/:id",validation(validators.DeleteMessage),auth(),MessageController.DeleteMessage)

export default router