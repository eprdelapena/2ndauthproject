import mongoose, {Schema, models, model} from 'mongoose';

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    
    lastname: {
        type: String,
        required: true,
    },

    emailadd: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    //1. import these new parameters
    resetToken: {
        type: String,
        required: false
    },

    resetTokenExpiry: {
        type: Date,
        required: false
    }
}, {timestamps: true});

export const registerSchema = models?.users || model("users", userSchema);