import { db } from "../db.js";

export const getEmprestimos = (_, res) => {
  const q = `
    SELECT 
      emprestimos.id,
      leitores.nome AS leitor,
      livros.titulo AS livro,
      emprestimos.data_emprestimo,
      emprestimos.data_devolucao
    FROM emprestimos
    JOIN leitores ON emprestimos.id_leitor = leitores.id
    JOIN livros ON emprestimos.id_livro = livros.id
  `;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addEmprestimo = (req, res) => {
  const { leitor_nome, livro_titulo, data_emprestimo, data_devolucao } = req.body;

  // Buscar LEITOR pelo nome
  db.query("SELECT id FROM leitores WHERE nome = ?", [leitor_nome], (err, leitorResult) => {
    if (err) return res.json(err);

    if (leitorResult.length === 0) {
      return res.status(404).json({ message: "Leitor não encontrado. Cadastre o leitor primeiro." });
    }

    const leitorId = leitorResult[0].id;

    // Buscar LIVRO pelo título
    db.query("SELECT id FROM livros WHERE titulo = ?", [livro_titulo], (err, livroResult) => {
      if (err) return res.json(err);

      if (livroResult.length === 0) {
        return res.status(404).json({ message: "Livro não encontrado. Cadastre o livro primeiro." });
      }

      const livroId = livroResult[0].id;

      // Inserir o empréstimo
      const q = `
        INSERT INTO emprestimos (id_leitor, id_livro, data_emprestimo, data_devolucao)
        VALUES (?)
      `;

      const values = [leitorId, livroId, data_emprestimo, data_devolucao];

      db.query(q, [values], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("Empréstimo registrado com sucesso");
      });
    });
  });
};

export const updateEmprestimo = (req, res) => {
  const { leitor_nome, livro_titulo, data_emprestimo, data_devolucao } = req.body;
  const { id } = req.params;

  // Buscar LEITOR
  db.query("SELECT id FROM leitores WHERE nome = ?", [leitor_nome], (err, leitorResult) => {
    if (err) return res.json(err);

    if (leitorResult.length === 0) {
      return res.status(404).json({ message: "Leitor não encontrado." });
    }

    const leitorId = leitorResult[0].id;

    // Buscar LIVRO
    db.query("SELECT id FROM livros WHERE titulo = ?", [livro_titulo], (err, livroResult) => {
      if (err) return res.json(err);

      if (livroResult.length === 0) {
        return res.status(404).json({ message: "Livro não encontrado." });
      }

      const livroId = livroResult[0].id;

      // Atualizar empréstimo
      const q = `
        UPDATE emprestimos
        SET id_leitor = ?, id_livro = ?, data_emprestimo = ?, data_devolucao = ?
        WHERE id = ?
      `;

      const values = [leitorId, livroId, data_emprestimo, data_devolucao, id];

      db.query(q, values, (err) => {
        if (err) return res.json(err);
        return res.status(200).json("Empréstimo atualizado com sucesso");
      });
    });
  });
};

export const deleteEmprestimo = (req, res) => {
  const q = "DELETE FROM emprestimos WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Empréstimo deletado com sucesso");
  });
};
