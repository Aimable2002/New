import mongoose from "mongoose";


const connectDB = async() => {
    try{
        const URI = process.env.URI;

        await mongoose.connect(URI)
        console.log("connected DB")
    }catch(error){
        console.log("fail to connect DB", error.messages)
    }
}

export default connectDB;