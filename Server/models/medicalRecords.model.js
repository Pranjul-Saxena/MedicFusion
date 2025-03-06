const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
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
  
  const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
  
export default MedicalRecord;
