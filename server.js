const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const { Projects, Users, Tickets } = require("./Routes/index.js");

mongoose.connect(`mongodb+srv://herokuUser:${process.env.herokuPass}@cluster0.beusi.mongodb.net/`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Successfully connected to Database");
});

app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use("/api", Projects);
app.use("/api", Users);
app.use("/api", Tickets);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontEnd/public/index.html"));
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});