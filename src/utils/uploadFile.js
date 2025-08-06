const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directories exist
const createUploadDirs = () => {
  const dirs = [
    "./src/uploads/products",
    "./src/uploads/partners",
    "./src/uploads/packages"
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadType = req.body.uploadType || 'products';
    const uploadPath = `./src/uploads/${uploadType}`;
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allow only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// File uploader middleware factory
const fileUploader = (uploadType, fields) => {
  return upload.fields(fields.map(field => ({
    name: field.name,
    maxCount: field.maxCount || 1
  })));
};

// Error handling middleware
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.apiError('File too large. Maximum size is 5MB.', 400);
    }
    return res.apiError('File upload error: ' + error.message, 400);
  } else if (error) {
    return res.apiError(error.message, 400);
  }
  next();
};

module.exports = {
  fileUploader,
  handleUploadError
}; 