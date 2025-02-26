import express from 'express'

import { isLogedin } from '../middlewares/isLogedIn.js'
const router = express.Router();

router.post('/signup', isLogedin, );

export default router;