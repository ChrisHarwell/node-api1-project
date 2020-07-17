const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on localhost: ${PORT}`);
});

let users = [];

// GET
server.get("/api/users", (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.get("/api/users/:id", (req, res) => {
  const { id, name, bio } = req.params;
  const changes = req.body;

  changes.id = id;

  try {
    let index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users[index] = changes;
      res.status(200).json(users[index]);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({ message: "error: ", err });
  }
});

// POST
server.post("/api/users", (req, res) => {
  const userData = req.body;
  userData.id = shortid.generate();

  try {
    if (userData.name && userData.bio) {
      users.push(userData);
      res.status(201).json(userData);
    } else {
      res.status(404).json("Bad Request");
    }
  } catch (error) {
    res.status(500).json({ message: "error: ", err });
  }
});

// PUT
server.put("/api/users/:id", (req, res) => {
  const { id, name, bio } = req.params;
  const changes = req.body;

  changes.id = id;
  changes.name = name;
  changes.bio = bio;

  // if (!name || !bio) {
  //   console.log(name);
  //   res
  //     .status(400)
  //     .json({ errorMessage: "Please provide name and bio for the user." });
  // }

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
