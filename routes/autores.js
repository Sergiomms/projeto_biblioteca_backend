import express from "express"
import { getAutores, updateAutor, deleteAutor, addAutor } from "../controllers/autores.js"

const router = express.Router()

router.get("/", getAutores)

router.post("/", addAutor)

router.put("/:id", updateAutor)

router.delete("/:id", deleteAutor)

export default router;

