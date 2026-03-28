import express from 'express';
import { body } from 'express-validator';
import { registerUser } from '../controller/userController.js';
const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid mail'),
    body('fullname.firstname').isLength(3).withMessage("first name must be 3 char long"),
    body('fullname.lastname').isLength(3).withMessage("last name must be 3 char long"),
    body('password').isLength(6).withMessage("password must be 6 char long"),
],
    registerUser
)


export default router;