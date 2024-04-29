const router = require('express').Router();
const registerController = require('../controllers/registerController')

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Create a register
 *     description: Create a new register
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *               website:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Register create succesful.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error .
 */
router.post('/',registerController.createRegister)

/**
 * @swagger
 * /api/register:
 *   get:
 *     summary: get all register by user
 *     description: get all register by user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: list of register by user
 *       404:
 *         description: Not found 
 *       500:
 *         description: Server error
 */
router.get('/',registerController.getRegisters)

/**
 * @swagger
 * /api/register/{id}:
 *   get:
 *     summary: get register by Id
 *     description: get register by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Register ID.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get register successful.
 *       404:
 *         description: Register not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id', registerController.getRegister)

module.exports = router