import app from './app.js';
import { config } from "dotenv";
import cloudnary from "cloudinary";
import connectionToDB from './config/dbConnection.js';
import env from './config/constants.js';
config();
const PORT = env.PORT || 5000;

// cloudnary.v2.config({
//     cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
//     api_key: process.env.CLOUDNARY_API_KEY,
//     api_secret: process.env.CLOUDNARY_API_SECRET,
// });

app.listen(PORT, async () => {
    await connectionToDB();
    console.log(`Server is running on port http:localhost:${PORT}`);
});