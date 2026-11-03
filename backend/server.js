const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/resume")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const db = mongoose.connection;

app.get("/api/resume", async (req, res) => {
    try {
        const profile = await db.collection("profiles").findOne({});
        const education = await db.collection("education").find().toArray();
        const skills = await db.collection("skills").find().toArray();
        const internships = await db.collection("internships").find().toArray();
        const experience = await db.collection("experience").find().toArray();
        const certifications = await db.collection("certifications").find().toArray();

        res.json({ profile, education, skills, internships, experience, certifications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});