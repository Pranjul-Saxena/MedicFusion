import Clinic from "../models/clinic.model.js";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";
// Add Patient
export const addPatient = async (req, res) => {
  try {
    const {
      patient_name,
      contact_no,
      email_add,
      doctor_re,
      age,
      address,
      gender,
      advance_pay,
      clinic_id,
    } = req.body;

    console.log({
      patient_name,
      contact_no,
      email_add,
      doctor_re,
      age,
      address,
      gender,
      advance_pay,
      clinic_id,
    });
    // Validate required fields
    if (
      !patient_name ||
      !contact_no ||
      !email_add ||
      !doctor_re ||
      !age ||
      !address ||
      !gender ||
      !advance_pay ||
      !clinic_id
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    // Check if clinic exists
    const clinicExists = await Clinic.findById(clinic_id);
    if (!clinicExists) {
      return res.status(404).json({
        success: false,
        message: 'Clinic not found.',
      });
    }

    // Check if doctor exists and is associated with the clinic
    const doctor = await User.findOne({
      _id: doctor_re,
      clinic_id,
      user_type: 'Doctor',
      status: 'Active',
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found or inactive.',
      });
    }

    // Check for duplicate patient by email within the clinic
    const existingPatient = await Patient.findOne({
      email_add,
      clinic_id,
    });
    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: 'Patient with this email already exists.',
      });
    }

    // Create a new patient
    const newPatient = new Patient({
      patient_name,
      contact_no,
      email_add,
      doctor_re,
      age,
      address,
      gender,
      advance_pay,
      clinic_id,
    });

    // Save patient to the database
    await newPatient.save();

    res.status(201).json({
      success: true,
      message: 'Patient added successfully.',
      patient: newPatient,
    });
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};
// Get all patients for a clinic
export const getPatients = async (req, res) => {
  try {
    // console.log(req);
    const { clinic_id } = req.params;
    console.log('clinic id inside', clinic_id); // Get

    // Validate clinic_id
    if (!clinic_id) {
      return res.status(400).json({ success: false, message: 'Clinic ID is required.' });
    }

    // Fetch patients for the clinic where status is Active
    const patients = await Patient.find({ clinic_id, status: 'Active' })
      .populate('doctor_re', 'name');

    // Check if patients exist
    if (!patients.length) {
      return res.status(404).json({ success: false, message: 'No active patients found.' });
    }

    res.status(200).json({ success: true, patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
// Update patient details
export const updatePatient = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const updateData = req.body;

    // Validate patient_id
    if (!patient_id) {
      return res.status(400).json({ success: false, message: 'Patient ID is required.' });
    }

    // Find and update patient
    const updatedPatient = await Patient.findByIdAndUpdate(patient_id, updateData, {
      new: true,
      runValidators: true,
    });

    // Check if patient exists
    if (!updatedPatient) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    res.status(200).json({ success: true, message: 'Patient updated successfully.', updatedPatient });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
// Delete patient by ID
export const deletePatient = async (req, res) => {
  try {
    const { patient_id } = req.params;

    // Validate patient_id
    if (!patient_id) {
      return res.status(400).json({ success: false, message: 'Patient ID is required.' });
    }

    // Find and delete the patient
    const deletedPatient = await Patient.findByIdAndDelete(patient_id);

    // Check if patient exists
    if (!deletedPatient) {
      return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    res.status(200).json({ success: true, message: 'Patient deleted successfully.' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
export const searchPatients = async (req, res) => {
  console.log('Search Route Hit');
  console.log('Query:', req.query);

  const { query } = req.query;
  if (!query) return res.status(400).json({ message: 'Query parameter is required' });

  try {
    const patients = await Patient.find({
      $or: [
        { patient_name: { $regex: query, $options: 'i' } },
        { contact_no: { $regex: query, $options: 'i' } },
      ],
    });
    console.log('Patients Found:', patients);
    return res.status(200).json({ patients });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}
// Get Patient Details by ID
export const getPatientDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching patient details with id:", id); // Get

    // Fetch patient details and populate necessary fields
    const patient = await Patient.findById(id)
      // .populate("patient", "patient_name contact_no email_add")  // Populate doctor details if needed
      .populate("doctor_re", "name")  // Populate doctor details if needed
      .populate("appointments", "appointmentDate appointmentTime");  // Fetch related appointments

    // console.log(">>>>>>> Patient>>>>>>", patient);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    res.status(200).json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};