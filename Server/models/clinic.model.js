const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        line1: { type: String, required: true },
        line2: { type: String },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
    },
    specialization: {
        type: [String],
        required: true, // e.g., ['Cardiology', 'Orthopedics']
    },
},{ timestamps: true });

const Clinic = mongoose.model('Clinic', clinicSchema);




export default Clinic;