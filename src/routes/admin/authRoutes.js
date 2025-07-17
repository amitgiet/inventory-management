const authController = require('../../controllers/authController');
const { verifyRefreshToken } = require('../../middlewares/verifyToken');
const router = require('express').Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', verifyRefreshToken, authController.generateAccessToken);

module.exports = router;