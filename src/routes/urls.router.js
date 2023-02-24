import { Router } from "express";
import validationPostShortenUrl from '../middlewares/urls.middleware.js';
import {postShortenUrl,getUrlById,getShortUrl, deleteUrl} from '../controllers/urls.controller.js';
import authValidation from "../middlewares/auth.validation.js";
const router = Router();

router.post("/urls/shorten",validationPostShortenUrl,postShortenUrl)
router.get("/urls/:id",getUrlById)
router.get("/urls/open/:shortUrl",getShortUrl)
router.delete("/urls/:id",authValidation,deleteUrl)

export default router;