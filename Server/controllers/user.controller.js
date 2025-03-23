import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const cookieOptions = {
    // expires: new Date(Date.now() + 7*24*3600000), // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
    httpOnly: true,
}
// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email }).populate('clinic_id', 'name address city pincode');

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare password using bcrypt
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password === user.password; // For simplicity, we're comparing plain text passwords. In a real-world application, use bcrypt.compare() instead.

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                user_type: user.user_type,
                clinic_id: user.clinic_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        user.password = undefined;
        // token is stored in the browser
        res.cookie("token", token, cookieOptions);
        // Remove password from the response
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: userData,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const logout = async (req, res) => {
    try {
        // Clear the token stored on the client (if using cookies)
        res.clearCookie("token", { httpOnly: true, secure: true });

        // If using JWT in headers, just send a success response
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ success: false, message: "Logout failed" });
    }
};
export const getDoctors = async (req, res) => {
    try {
      const { clinic_id } = req.params; // Get clinic_id from request parameters
        console.log("clinic id inside",clinic_id); // Get
      // Validate clinic_id
      if (!clinic_id) {
        return res.status(400).json({ message: 'Clinic ID is required.' });
      }
  
      // Find doctors associated with the clinic
      const doctors = await User.find({ clinic_id, user_type: 'Doctor', status: 'Active' });
      console.log("dotor",doctors); // Get
      // Check if doctors exist
      if (!doctors.length) {
        return res.status(404).json({ message: 'No active doctors found for this clinic.' });
      }
  
      res.status(200).json({ success: true, doctors });
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  };