const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "Manish Bharti" },
  { id: 2, name: "Avya Bharti" },
];

router.get("/", (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send("Name is required");

    const newUser = {
      id: users.length + 1,
      name: name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
