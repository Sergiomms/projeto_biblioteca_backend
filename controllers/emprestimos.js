import { db } from "../db.js";

export const getEmprestimos = (_, res) => {
  const q = `
    SELECT 
      emprestimos.id,
      emprestimos.livro_id,
      emprestimos.leitor_id,
      leitores.nome AS leitor,
      livros.titulo AS livro,
      emprestimos.data_emprestimo,
      emprestimos.data_devolucao,
      emprestimos.status
    FROM emprestimos
    JOIN leitores ON emprestimos.leitor_id = leitores.id
    JOIN livros ON emprestimos.livro_id = livros.id;
  `;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const addEmprestimo = (req, res) => {
  console.log("BODY RECEBIDO NO BACK:", req.body);
  const { leitor_id, livro_id, data_emprestimo, data_devolucao, status } = req.body;

  const q = `
    INSERT INTO emprestimos (leitor_id, livro_id, data_emprestimo, data_devolucao, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [leitor_id, livro_id, data_emprestimo, data_devolucao, status];

  db.query(q, values, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Empréstimo registrado com sucesso");
  });
};

export const updateEmprestimo = (req, res) => {
  const { leitor_id, livro_id, data_emprestimo, data_devolucao, status } = req.body;
  const { id } = req.params;

  const q = `
    UPDATE emprestimos
    SET leitor_id = ?, livro_id = ?, data_emprestimo = ?, data_devolucao = ?, status = ?
    WHERE id = ?
  `;

  const values = [leitor_id, livro_id, data_emprestimo, data_devolucao, status, id];

  db.query(q, values, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Empréstimo atualizado com sucesso");
  });
};

export const deleteEmprestimo = (req, res) => {
  const q = "DELETE FROM emprestimos WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Empréstimo deletado com sucesso");
  });
};
