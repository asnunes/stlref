import { Router } from "express";
import useRouter from './user.router.js';
import urlsRouter from './urls.router.js';
const router = Router();

router.use(useRouter);
router.use(urlsRouter);

export default router;