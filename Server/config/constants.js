import { config } from "dotenv";
config();

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/sample',
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1h',
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost/3000",
}

export default env;