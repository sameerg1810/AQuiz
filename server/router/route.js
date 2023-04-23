import { Router } from "express";
import * as controllers from "../controllers/controller.js";

const router = Router();

router.get("/questions", controllers.getQuestions);
router.post("/questions", controllers.insertQuestions);
router.delete("/questions", controllers.dropQuestions);

router.get("/result", controllers.getResult);
router.post("/result", controllers.storeResult);
router.delete("/result", controllers.dropResult);

export default router;
