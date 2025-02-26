import express from 'express'
import { signup, login, verifyAccountReq, verifyAccount, forgetPassword } from '../controllers/auth_Controller.js';
import { isLogedin } from '../middlewares/isLogedIn.js'

const router = express.Router();

router.post('/signup', signup );
router.post('/login', login);
router.post('/forgetpassword', forgetPassword)

router.post('/verify/req', isLogedin, verifyAccountReq)
router.post('/verify/account', isLogedin, verifyAccount)

export default router;