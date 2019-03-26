// implement your API here


const express = require('express');

const db = require('./data/db');
const port = 4000;
const server = express();

server.use(express.json());


server.get("/api/users", (req, res) => {
    const id = req.params.id;
    db
      .find()
      .then(user => {
        if (user) {
          res.status(200).json({ success: true, user });
        } else {
          res
            .status(404)
            .json({ success: false, message: "could not find that id" });
        }
      })
      .catch(({ code, message }) => {
        res.status(code).json({ success: false, message });
      });
  });
  



server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    db
    .insert(userInfo)
    .then(u => {
        res.status(201).json({
            success: true,
            u
        })
    })
    .catch(({code, message}) => {
        res.status(code).json({
            success: false,
            message
        })
    })
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    db
      .findById(id)
      .then(hub => {
        if (hub) {
          res.status(200).json({ success: true, hub });
        } else {
          res
            .status(404)
            .json({ success: false, message: "could not find that id" });
        }
      })
      .catch(({ code, message }) => {
        res.status(code).json({ success: false, message });
      });
  });

  server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    db
      .remove(id)
      .then(deleted => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(500).json({
          message: 'error deleting'
        });
      });
  });
  




server.get("/", (req, res) => {
    res.send("Hello World");
  });

  server.listen(port, () => {
    console.log("\n *** Server Running on http://localhost:4000 ***\n");
  });