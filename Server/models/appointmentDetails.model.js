const mongoose = require('mongoose');

const appointmentDetailsSchema = new mongoose.Schema({
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    examinedAt: {
      type: Date,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },{ timestamps: true });
  
  const AppointmentDetail = mongoose.model('AppointmentDetail', appointmentDetailsSchema);
  
export default AppointmentDetail;
