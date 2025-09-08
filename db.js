import mysql from 'mysql';

export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "biblioteca"
})




