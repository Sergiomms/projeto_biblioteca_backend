import { response } from "express"
import { db } from "../db.js"

export const getAutores = (_, res) => {
  const q = "SELECT * FROM autores"

  db.query(q, (err, data) => {
    if(err) return res.json(err)

    return res.status(200).json(data)
  })
}

export const addAutor = async (req, res) => {
  const q = "INSERT INTO autores(nome, biografia) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.biografia
  ]

  await db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso");
  })
}

export const updateAutor = async (req, res) => {
  const q = "UPDATE autores SET nome = ?, biografia = ? WHERE id = ?";

  const values = [
    req.body.nome,
    req.body.biografia
  ]

  await db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso");
  })
}

export const deleteAutor = (req, res) => {
  const q = "DELETE FROM autores WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso");
  })
}