import { Router } from "express";

import CreateUser from "../controller/CreateUser";

const router = Router();

router.post('/', CreateUser.store);

export default router;