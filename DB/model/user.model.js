
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema= new mongoose.Schema({

  fName:String,
  lName:String,
  userName:{
    type:String,
    required:true

  },
  email:{
    type:String,
    required:true,
    unique:true

  },
  
    password:{
        type:String,
        required:true,
    
  },
 gender: {
    type:String,
    default:"Male",
    enum:["Male","female"]

  },

  confirmEmail:{
    type:Boolean,
    default:false
},



   profilepic:String,
   imagePublicId:String,

   coverpic:Array,

   online:{
    type:Boolean,
    default:true
   },
   lastseen:Date
   


},{
    timestamps:true
  
})

userSchema.pre("save", async function(next){

const user= this
user.password= await bcrypt.hashSync(user.password ,parseInt(process.env.saltRound))
next()
})


export const usermodel= mongoose.model("user",userSchema)
export default usermodel