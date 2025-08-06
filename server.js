const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const http = require('http');
const https = require('https');
const app = express();
require("dotenv").config()
const fs = require('fs');



let hostingServer;
if (process.env.NODE_ENV == "development") {
  hostingServer = http.createServer(app);
} else if (process.env.NODE_ENV == "production") {
  const httpsOptions = {
    cert: fs.readFileSync("./ssl/ssl_25.cert"),
    ca: fs.readFileSync("./ssl/ca_25.cert"),
    key: fs.readFileSync("./ssl/ssl_25.key"),
  };
  hostingServer = https.createServer(httpsOptions, app);
}


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

app.get('/api/test', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running successfully!' });
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
hostingServer.listen(PORT,'192.168.1.27', () => console.log(`Server running on port ${PORT}`));
