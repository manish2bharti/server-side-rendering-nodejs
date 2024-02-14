// index.js

const express = require("express");
const path = require("path");
const { getData } = require("./data"); // Assume this function fetches large data from a database

const app = express();

// Set the view engine to use EJS
app.set("view engine", "ejs");
console.log("__dirname:", __dirname);
app.set("views", path.join(__dirname, "views"));

// Set the views directory explicitly
// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { page } = req.body;
    const currentPage = page || 1;
    const pageSize = 10;
    const offset = (currentPage - 1) * pageSize;

    const data = await getData(offset, pageSize);

    res.render("index", {
      title: "Server-Side Rendering",
      data,
      currentPage,
      pageSize,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", async (req, res) => {
  try {
    const currentPage = 1;
    const pageSize = 10;
    const offset = (currentPage - 1) * pageSize;

    const data = await getData(offset, pageSize);

    res.render("index", {
      title: "Server-Side Rendering",
      data,
      currentPage,
      pageSize,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/detail/:id", async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const itemDetail = await getData(0, 1, itemId);
    if (!itemDetail) {
      res.status(404).send("Item detail not found");
      return;
    }
    res.render("detail", { itemDetail });
  } catch (err) {
    console.error("Error fetching item detail:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
