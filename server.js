const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config()

// Middleware
app.use(helmet());
//ORIGIN CONFIG
const corsOptions = {
  origin: ["*"],
  credentials: true,
};

//CORS MIDDLEWARE
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(compression());
app.use(morgan("dev"));

app.use(
    "/uploads",
    express.static("uploads", {
      setHeaders: function (res, path) {
        res.set("Access-Control-Allow-Origin", "*");
      },
    })
  );

// Static file serving
app.get("/uploads/:folder/:filename", (req, res) => {
    res.sendFile(
      __dirname + "/uploads/" + req.params.folder + "/" + req.params.filename
    );
});


// API routes
require('./src/routes')(app);

// graceful shutdown
const shutdown = () => {
  console.log("Shutting down server...");
  app.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
