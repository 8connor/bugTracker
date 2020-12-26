const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const PORT = 3001;
const { Projects, Users } = require("./Routes/index.js");

mongoose.connect(
    `mongodb://localhost:27017/bugTracker`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Successfully connected to Database");
    }
);

app.use(express.json());

app.use("/api", Projects)
app.use("/api", Users)


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontEnd/public/index.html"));
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});