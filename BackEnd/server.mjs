import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
  })
);

// Middleware (for parsing JSON requests)
app.use(express.json());

// POST route to handle data submission
app.post("/", (req, res) => {
  //   res.json({response:req.body}); // Send a response back
  res.json(req.body);
});

// GET route to handle responses (for example: returning JSON message)
app.get("/", (req, res) => {
//   res.json({ message: "Response from JSON" });
res.send("get request")
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
