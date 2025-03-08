import mongoose from "mongoose";
import Clinic from "../models/clinic.model.js";
import User from "../models/user.model.js";
// import bcrypt from "bcryptjs"
export const addClinic = async function (req, res, next) {
    try {
        const { name, address, city, pincode } = req.body;

        if (!name || !address || !city || !pincode) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (name.length < 3 || name.length > 100) {
            return res.status(400).json({ error: 'Name must be between 3 and 100 characters' });
        }

        if (address.length < 5 || address.length > 200) {
            return res.status(400).json({ error: 'Address must be between 5 and 200 characters' });
        }

        if (city.length < 2 || city.length > 50) {
            return res.status(400).json({ error: 'City must be between 2 and 50 characters' });
        }

        if (!/^\d{6}$/.test(pincode)) {
            return res.status(400).json({ error: 'Pincode must be a 6-digit number' });
        }

        const existingClinic = await Clinic.findOne({ name, city });
        if (existingClinic) {
            return res.status(400).json({ error: 'Clinic with the same name already exists in this city' });
        }

        const newClinic = await Clinic.create({ name, address, city, pincode });
        res.status(201).json({ message: 'Clinic created successfully', clinic: newClinic });
    } catch (error) {
        console.error('Error creating clinic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getClinics = async (req, res, next) => {
    try {
        // Fetch all clinics with sorting and selection
        const clinics = await Clinic.find({})
            .select('name address city pincode createdAt updatedAt')
            .sort({ createdAt: -1 }); // Sort by newest first

        if (!clinics.length) {
            return res.status(404).json({ message: 'No clinics found' });
        }

        res.status(200).json({ clinics });
    } catch (error) {
        console.error('Error fetching clinics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const addUser = async (req, res, next) => {
    // console.log('hello');
    try {
        const {
            name,
            user_type,
            email,
            password,
            experience,
            education,
            clinic_id,
            address,
            city,
            pincode,
        } = req.body;

        // Input Validation
        if (!name || name.length < 3) {
            return res.status(400).json({ error: 'Name must be at least 3 characters' });
        }

        if (!['Doctor', 'Receptionist'].includes(user_type)) {
            return res.status(400).json({ error: 'Invalid user type' });
        }

        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        if (!password || password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        if (!mongoose.Types.ObjectId.isValid(clinic_id)) {
            return res.status(400).json({ error: 'Invalid clinic ID' });
        }

        // Check if Clinic Exists
        const clinic = await Clinic.findById(clinic_id);
        if (!clinic) {
            return res.status(404).json({ error: 'Clinic not found' });
        }

        // Check for Duplicate Email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        // Hash Password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create New User (Doctor or Receptionist)
        const newUser = await User.create({
            name,
            user_type,
            email,
            // password: hashedPassword,
            password,
            experience,
            education,
            clinic_id,
            address,
            city,
            pincode,
        });

        res.status(201).json({
            message: `${user_type} added successfully`,
            user: {
                id: newUser._id,
                name: newUser.name,
                user_type: newUser.user_type,
                clinic: clinic.name,
            },
        });
    } catch (error) {
        console.error('Error adding doctor/receptionist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUsers = async (req, res, next) => {
  try {
    // Fetch all users and populate the 'clinic_id' to get clinic details
    const users = await User.find({})
      .populate('clinic_id', 'name address city pincode') // Include specific clinic fields
      .select('-password'); // Exclude the password field

    if (!users.length) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

