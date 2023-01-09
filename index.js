const express = require("express");
const app = express();
const cors = require("cors");
const { getPosts, createPost, addLike, deletePost } = require('./posts');

PORT = 3000;

// Iniciador de puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Habilitar CORS y Mod de json
app.use(express.json());
app.use(cors());


app.use(express.static("public")); 

// Muestra archivos en el home
app.get("/", (req, res) => {
  try {
    res.sendFile();
  } catch (error) {
    res.json({ message: "No se encuentra el recurso solicitado" });
  }
});


//Endpoint para buscar los Posts
app.get('/posts', async (req, res) => {
  try {
    const getPost = await getPosts();
    console.log(getPost);
    res.json(getPost);
  } catch (error) {
    console.log(error);
  }
});


//Endpoint para crear Posts
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion, likes } = req.body;
    await createPost(titulo, url, descripcion, likes);
    res.send("Post creado con exito");
  } catch (error) {
    console.log(error);
  }
});

// Elimnar Post 

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deletePost(id);
    res.json({ message: "Post eliminado con exito" });
  } catch (error) {
    console.log(error);
  }
});

// Actualizar likes

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await addLike(id);
    res.send("Like agregado con exito");
  } catch (error) {
    res.status(500).send("No se pudo agregar tu like.");
  }
});




