const router = require('express').Router();
const userController =  require('../controllers/userController');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get user
 *     description: Retrieves the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              properties:
 *                  email:
 *                      type: string
 *                  username:
 *                      type: string
 *                  id:
 *                      type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/',userController.getUser)
router.delete('/',userController.deleteUser)
router.put('/',userController.updateUser)

module.exports = router