const express = require("express");
const app = express();
const port = 8080;
const cors = require('cors');

const login = require('./routes/login');
const list = require('./routes/list');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// routes
app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/api", login);
app.use("/list", list);

// handle errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));