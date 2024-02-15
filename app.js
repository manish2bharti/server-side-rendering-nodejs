const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const usersRoutes = require("./routes/users");

app.use("/api/users", usersRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
