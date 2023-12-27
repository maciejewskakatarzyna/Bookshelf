import express from "express";
const app = express();
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
