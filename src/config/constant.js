require("dotenv").config();

module.exports = {
  JWTSECRET: process.env.JWTSECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME,

  smtp: {
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE,
  },

  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,

  CURRENCY: process.env.CURRENCY,
  PLATFORM_FEE: parseFloat(process.env.PLATFORM_FEE || 10),
  FOLLOW_UP_FEE: parseFloat(process.env.FOLLOW_UP_FEE || 10),
  CONSULTANT_SLOT_DURATION: parseInt(
    process.env.CONSULTANT_SLOT_DURATION || 15
  ),
};
