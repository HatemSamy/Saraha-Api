import MessageModel from "../../../DB/model/message.model.js"
import usermodel from "../../../DB/model/user.model.js"
import AsyndHandler from "express-async-handler"




export const SendMessage = AsyndHandler(async (req, res, next) => {

    const { text } = req.body
    const { recieverId } = req.params

    const reciever = await usermodel.findById(recieverId).select("UserName")
    if (!reciever) {
        return res.status(404).json({ message: "not found reciever" })
    } else {

        const SaveMessage = new MessageModel({ text, recieverId })
        const Message = await SaveMessage.save()
        res.status(201).json({ message: "message sended successfully", Message })

    }

}
)
export const GetMessage = AsyndHandler(async (req, res, next) => {

    const Messages = await MessageModel.find({recieverId:req.user._id})
    res.status(201).json({ message: "message list", Messages })
    console.log(req.user._id);

})

export const DeleteMessage = AsyndHandler(async (req, res, next) => {

    const { id } = req.params
    const Message = await MessageModel.deleteOne({ recieverId: req.user._id, _id: id })
    Message.deletedCount ? res.status(201).json({ message: "message deleted successfully", Message }) :
        res.status(404).json({ message: "in-valid message ID or In-valid userId" })

})

