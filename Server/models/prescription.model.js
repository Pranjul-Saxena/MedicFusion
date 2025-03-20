import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  symptoms: {
    type: String,
    // default: "s1"
    // required: true,
  },
  medicine: {
    type: String,
    // default: "m1"
    // required: true,
  },
  tests: {
    type: String,
    // default: "t1"
    // required: true,
  },
  suggestions: {
    type: String,
    // default: "s1"
    // required: true,
  },
  reports: [
    {
      type: String, // Store file paths or URLs
    },
  ],
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment', // Reference to the Appointment model
    required: true, // Make it required if every prescription must be linked to an appointment
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
