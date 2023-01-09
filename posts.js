require("dotenv").config({ path: "./.env" });

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});
const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};
const createPost = async (titulo, url, descripcion, likes) => {
  const query = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, url, descripcion, 0];
  const result = await pool.query(query, values);
  console.log("Post agregado con exito");
};

const deletePost = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  console.log("Post eliminado con exito");
};

const addLike = async (id) => {
  const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  console.log("Like agregado con exito");
};

module.exports = { getPosts, createPost, addLike, deletePost };
