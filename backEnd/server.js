const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3001;

mongoose.connect(
    `mongodb://localhost:27017/bugTracker`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Successfully connected to Database");
    }
);

app.use(express.json());

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})