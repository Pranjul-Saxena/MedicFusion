import path from "path";
import multer from "multer";
import fs from "fs";

// Ensure the upload directory exists
const uploadDir = "uploads/reports";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed file extensions
const allowedExtensions = [
    ".jpg", ".jpeg", ".webp", ".png", ".mp4",  // Images & Videos
    ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt" // Documents
];

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname.replace(/\s+/g, "_")); // Preserve filename
    },
});

// File filter (Allow only specified file types)
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", `Invalid file type. Allowed: ${allowedExtensions.join(", ")}`));
    }
};

// Multer instance
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
    fileFilter,
});

// Middleware for handling errors
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    }
    next(err);
};

export { upload, handleMulterError };
