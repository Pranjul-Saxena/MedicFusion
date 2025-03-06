const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    diagnosedWith: {
      type: String,
      default: 'Not Diagnosed',
    },
    address: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ['M', 'F', 'O'],
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    admitted_In: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clinic',
      required: true,
    },
  },{ timestamps: true });
  
  const Patient = mongoose.model('Patient', patientSchema);


  export default Patient;