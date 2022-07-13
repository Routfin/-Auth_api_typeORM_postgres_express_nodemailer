import { Router } from "express";

import ActivateUser from "../controller/ActivateUser";

const router = Router();

router.post('/', ActivateUser.execute);

export default router;