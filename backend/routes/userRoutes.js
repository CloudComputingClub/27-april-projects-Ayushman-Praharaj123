import express from 'express';
import { body } from 'express-validator';
import { registerUser,loginUser ,getUserProfile,logoutUser } from '../controller/userController.js';
import { authUser } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid mail'),
    body('fullname.firstname').isLength(3).withMessage("first name must be 3 char long"),
    body('fullname.lastname').isLength(3).withMessage("last name must be 3 char long"),
    body('password').isLength(6).withMessage("password must be 6 char long"),
],
    registerUser
)
router.post('/login',[
    body('email').isEmail().withMessage('Invalid mail'),
    body('password').isLength(6).withMessage("password must be 6 char long"),
],
        loginUser
)
router.get('/profile',authUser ,getUserProfile);
router.get('/logout',authUser,logoutUser)

export default router;