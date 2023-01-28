import express from "express";

const app = express();
const PORT = 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/:q", (req, res) => {
    const q = req.params.q;
    try {
        const numForm = parseInt(q);
        if (!q.includes("-")) {
            const date = new Date(numForm);
            const unix = date.valueOf();
            const utc = date.toUTCString();

            res.send({
                unix,
                utc,
            });
        } else {
            const date = new Date(q);
            const unix = date.getTime() / 1000;
            const utc = date.toUTCString();
            res.send({
                unix,
                utc,
            });
        }
    } catch {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log("Server running at port: " + PORT);
});
