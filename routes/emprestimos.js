import express from "express";
import {
  getEmprestimos,
  addEmprestimo,
  updateEmprestimo,
  deleteEmprestimo
} from "../controllers/emprestimos.js";

const router = express.Router();

router.get("/", getEmprestimos);

router.post("/", addEmprestimo);

router.put("/:id", updateEmprestimo);

router.delete("/:id", deleteEmprestimo);

export default router;