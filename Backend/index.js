const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./model");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());
//Write missing code here

//Write your POST API here
app.post("/add", async (req,res) => {
  try{
    const { title, content, img_url } = req.body;
    const newBlog = new Blog({title, content, img_url});
    await newBlog.save();
    res.status(200).send("Blog created");
  }
  catch(error){
    console.log(error);
    res.status(500).send("Error creating blog");
  }
})

app.get("/get", async (req, res) => {
  try {
    let data = await Blog.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching blogs")
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.status(200).send("Blog deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting blog");
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching blog");
  }
});

app.put("/update/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const { title, content, img_url } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, img_url },
      { new: true }
    );

    res.status(200).json({ message: "Blog updated", blog: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating blog");
  }
})

mongoose
  .connect(
    "mongodb+srv://alisha01:alisha12@cluster0.zyrmt.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("✅ Connected to DB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB connection failed:", error);
  });

// app.listen(PORT, () => {
//   console.log(`${PORT} is up and running`);
// });
