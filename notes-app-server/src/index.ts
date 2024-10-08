import express from "express";
import cors from "cors";
const db = require('../db');
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();


app.use(express.json());
app.use(cors());

app.get("/notes", async (req, res) => {
  res.json({ message: "success!" });
});

app.get("/api/notes", async (req, res) => {
    const notes = await prisma.notes.findMany();
    res.json(notes);
});

app.post("/api/notes", async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send("title and content fields required");
    }

    try {
        const note = await prisma.notes.create({
        data: { title, content },
        });
        res.json(note);
    } catch (error) {
        res.status(500).send("Oops, something went wrong");
    }
});

app.put("/api/notes/:id", async (req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);
  
    if (!title || !content) {
      return res.status(400).send("title and content fields required");
    }
  
    if (!id || isNaN(id)) {
      return res.status(400).send("ID must be a valid number");
    }
  
    try {
      const updatedNote = await prisma.notes.update({
        where: { id },
        data: { title, content },
      });
      res.json(updatedNote);
    } catch (error) {
      res.status(500).send("Oops, something went wrong");
    }
});

app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
        return res.status(400).send("ID field required");
    }

    try {
        await prisma.notes.delete({
        where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).send("Oops, something went wrong");
    }
});

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});