import { Router } from "express";

import ForgotPassword from "../controller/ForgotPassword";
import ResetPassword from "../controller/ResetPassword";

const router = Router();

router.post('/', ForgotPassword.authenticate);
router.post('/reset', ResetPassword.execute);

export default router;