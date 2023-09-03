import mongoose from 'mongoose';

const connectDB  = async ()=>{
    return  await mongoose.connect(process.env.DATABASEURL)
    .then(result=>{
        console.log(`ConnectedDB`);
    }).catch(err=>console.log(`Fail to connect ${err}`))
}
export default connectDB