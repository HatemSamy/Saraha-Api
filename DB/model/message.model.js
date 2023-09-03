
import { Schema, model,Types} from "mongoose"

const MessageSchema= new Schema({

text:{
type:String,
required:true

},

recieverId:{
type:Types.ObjectId,
ref:"user",
required:true
}


},{
    timestamps:true
})


const MessageModel= model ("Message",MessageSchema)
export default MessageModel
