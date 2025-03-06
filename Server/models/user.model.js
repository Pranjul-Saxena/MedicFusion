const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['Owner', 'Doctor', 'Receptionist'],
        required: true,
    },
    experience: {
        type: Number,
        required: true,
        min: 0,
    },
    salary: {
        type: Number,
        required: true,
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true,
    },
    address: {
        line1: { type: String, required: true },
        line2: { type: String },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
    },
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;