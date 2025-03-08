import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra white spaces
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d{6}$/.test(v), // Validates 6-digit pincode
        message: 'Invalid pincode format',
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Clinic model
const Clinic = mongoose.model('Clinic', clinicSchema);

export default Clinic;
