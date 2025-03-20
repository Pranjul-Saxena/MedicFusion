import Appointment from "../models/appointmentDetails.model.js";
import Prescription from "../models/prescription.model.js";
export const addAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, appointmentDate, appointmentTime, clinic_id } = req.body;
        // console.log(">>>>>>", patientId, doctorId, appointmentDate, appointmentTime, clinic_id);
        if (!patientId || !doctorId || !appointmentDate || !appointmentTime || !clinic_id) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newAppointment = new Appointment({
            patient: patientId,
            doctor: doctorId,
            clinic: clinic_id,
            appointmentDate,
            appointmentTime,
        });

        await newAppointment.save();

        res.status(201).json({
            message: 'Appointment created successfully',
            appointment: newAppointment,
        });
    } catch (error) {
        console.error('Error adding appointment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getAppointments = async (req, res) => {
    try {
        const { doctorId, patientId, appointmentId, date, time, clinic_id, sortBy = 'appointmentDate', order = 'asc' } = req.query;
        let filter = {};

        // Apply filters if provided
        if (doctorId) filter.doctor = doctorId;
        if (patientId) filter.patient = patientId;
        if (date) filter.appointmentDate = date;
        if (time) filter.appointmentTime = time;
        if (clinic_id) filter.clinic = clinic_id;
        if (appointmentId) filter._id = appointmentId;

        // console.log(filter1 ,"and>>>>>>>>",filter);
        // Fetch filtered and sorted appointments
        const appointments = await Appointment.find(filter)
            .populate('doctor', 'name')
            .populate('patient', 'patient_name')
            .populate('clinic', 'name')
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 });

        // console.log(appointments);
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, message: "Error fetching appointments", error: error.message });
    }
};
export const getPrescriptions = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const prescriptions = await Prescription.find({ appointment: appointmentId }); // Fetch all prescriptions
        res.json(prescriptions);
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const addPrescription = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const prescriptionData = { appointment: appointmentId, ...req.body };

        let prescription = await Prescription.findOne({ appointment: appointmentId });

        if (!prescription) {
            prescription = await Prescription.create(prescriptionData);
        } else {
            prescription = await Prescription.findByIdAndUpdate(
                prescription._id,
                req.body,
                { new: true }
            );
        }

        res.status(201).json({
            success: true,
            message: "Prescription created successfully!",
            prescription
        });
    } catch (error) {
        console.error("Error adding prescription:", error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};
