import express from "express";
import {
  getLeitores,
  addLeitor,
  updateLeitor,
  deleteLeitor
} from "../controllers/leitores.js";

const router = express.Router();

router.get("/", getLeitores);
router.post("/", addLeitor);
router.put("/:id", updateLeitor);
router.delete("/:id", deleteLeitor);

export default router;