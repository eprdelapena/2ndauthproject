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

    verificationToken: {
        type: String,
        required: false
    },

    verified: {
        type: Boolean,
        required: false
    },

    resetToken: {
        type: String,
        required: false
    },

    resetTokenExpiry: {
        type: Date,
        required: false
    },

}, {timestamps: true, strict: false});

export const registerSchema = models?.users || model("users", userSchema);