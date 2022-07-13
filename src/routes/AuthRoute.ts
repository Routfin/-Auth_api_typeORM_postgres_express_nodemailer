import { Router } from "express";

import AuthUser from "../controller/AuthUser";

const router = Router();

router.post('/', AuthUser.authenticate);

export default router;