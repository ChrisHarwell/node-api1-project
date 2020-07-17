const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Listening on localhost: ${PORT}`);
});

let users = [];

// GET
server.get("/api/users", (req, res) => {
  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params();
});


// POST 
server.post("/api/users", (req, res) => {
    const userData = req.body;
    userData.id = shortid.generate();

    users.push(userData);

    res.status(201).json(userData);  
});

// PUT 
server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;
    try {
      let index = users.findIndex((user) => user.id === id);
  
      if (index !== -1) {
        users[index] = changes;
        res.status(200).json(users[index]);
      } else {
        res.status(404).json({ message: "user id not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "error: ", err });
    }
  });



