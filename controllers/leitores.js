import { db } from "../db.js";


export const getLeitores = (_, res) => {
  const q = "SELECT * FROM leitores";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const addLeitor = (req, res) => {
  const q = "INSERT INTO leitores (nome, email, telefone) VALUES (?)";
  const values = [req.body.nome, req.body.email, req.body.telefone];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Leitor adicionado com sucesso!");
  });
};

export const updateLeitor = (req, res) => {
  const q = "UPDATE leitores SET nome = ?, email = ?, telefone = ? WHERE id = ?";
  const values = [req.body.nome, req.body.email, req.body.telefone];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Leitor atualizado com sucesso!");
  });
};

export const deleteLeitor = (req, res) => {
  const q = "DELETE FROM leitores WHERE id = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Leitor excluído com sucesso!");
  });
};