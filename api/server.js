const express = require("express");

const Animals = require("../animals/animalsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/animals", (req, res) => {
  Animals.getAll()
    .then(animals => {
      res.status(200).json(animals);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/', (req, res) => {
    Animals.insert(req.body)
    .then(([id]) => {
        res.status(201).json(id);
    })
    .catch(error => {
        res.status(500).json({message: "Unable to add animal"})
    })
});

server.delete('/:id', (req, res) => {
    const {id} = req.params;

    Animals.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json({success: "animal was deleted"})
        } else {
            res.status(404).json({message: 'Could not find animal with that ID'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'failed to delete animal'})
    })
});

module.exports = server;