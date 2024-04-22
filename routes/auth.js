const router = require('express').Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request or user already registered with the provided username.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', authController.createUser)
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully. Returns user details and a token.
 *       401:
 *         description: Wrong credentials or wrong password.
 *       400:
 *         description: Bad request or error creating user.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', authController.loginUser)

module.exports = router;


