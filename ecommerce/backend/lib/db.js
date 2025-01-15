const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecommerce",
});

// API endpoint to add a product
app.post("/add-product", (req, res) => {
  const { productName, price, stock } = req.body;

  const sql = "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)";
  db.query(sql, [productName, price, stock], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Product added successfully" });
  });
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
