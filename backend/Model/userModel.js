import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: "Number",
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    avatar: {
        type: String,
        default: '',

    },
    profile: {
        type: String,
        default: '',
    }

})


const User = mongoose.model("User", UserSchema);

export default User