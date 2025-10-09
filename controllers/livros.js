import { response } from "express"
import { db } from "../db.js"

export const getLivros = (_, res) => {
  const q = "SELECT  livros.id,  livros.titulo,  livros.genero,  livros.ano_publicacao,  autores.nome AS autor FROM livros JOIN autores ON livros.autor_id = autores.id"

  db.query(q, (err, data) => {
    if(err) return res.json(err)

    return res.status(200).json(data)
  })
}

export const addLivro = async (req, res) => {

  const { titulo, genero, ano_publicado, autor_nome } = req.body;

  // Primeiro: buscar o autor pelo nome
  db.query("SELECT id FROM autores WHERE nome = ?", [autor_nome], (err, autorResult) => {
    if (err) return res.json(err);

    if (autorResult.length === 0) {
      return res
        .status(404)
        .json({ message: "Autor não encontrado. Cadastre o autor primeiro." });
    }

    const autorId = autorResult[0].id;

   
    const q = "INSERT INTO livros (titulo, genero, ano_publicacao, autor_id) VALUES (?)";
    const values = [titulo, genero, ano_publicado, autorId];

    db.query(q, [values], (err) => {
      if (err) return res.json(err);

      return res.status(200).json("Livro criado com sucesso");
    });
  });
}

export const updateLivro = async (req, res) => {
  const { titulo, genero, ano_publicado, autor_nome } = req.body;
  const { id } = req.params;

  // Primeiro: buscar o autor pelo nome
  db.query("SELECT id FROM autores WHERE nome = ?", [autor_nome], (err, autorResult) => {
    if (err) return res.json(err);

    if (autorResult.length === 0) {
      return res
        .status(404)
        .json({ message: "Autor não encontrado. Cadastre o autor primeiro." });
    }

    const autorId = autorResult[0].id;

    // Agora atualizar o livro
    const q = `
      UPDATE livros
      SET titulo = ?, genero = ?, ano_publicacao = ?, autor_id = ?
      WHERE id = ?
    `;
    const values = [titulo, genero, ano_publicado, autorId, id];

    db.query(q, values, (err) => {
      if (err) return res.json(err);

      return res.status(200).json("Livro atualizado com sucesso");
    });
  });
}

export const deleteLivro = (req, res) => {
  const q = "DELETE FROM livros WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Livro deletado com sucesso");
  })
}