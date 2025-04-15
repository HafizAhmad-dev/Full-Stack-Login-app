import express from "express";
import cors from "cors";
const app = express();
const host = "0.0.0.0"; // To allow connections from any IP in your local network
const port = 3000;

app.listen(port, host, () => {
  console.log(`Server is running at http://192.168.0.104:3000/`);
});

const users = [];
app.use(
  cors({
    origin: [
      "http://192.168.0.104:5173", // Frontend URL
      "http://localhost:5173",
    ],
  })
);

// Middleware (for parsing JSON requests)
app.use(express.json());

// POST route to handle data submission
app.post("/", (req, res) => {
  //   res.json({response:req.body}); // Send a response back
  res.json(req.body);
  const userData = {
    name: req.body.name,
    password: req.body.password,
    browser:req.body.browser,
    mobile:req.body.mobile,
    platform:req.body.platform
  };
  // console.log(userDat
  users.push(userData);
  console.log(users);
});

// GET route to handle responses (for example: returning JSON message)
app.get("/", (req, res) => {
  //   res.json({ message: "Response from JSON" });
  res.send("get request");
});

// Start server
