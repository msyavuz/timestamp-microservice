import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "../public/index.html");
});

app.get("/api/:q?", (req, res) => {
    const q = req.params.q;
    if (q) {
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
            res.send({ error: "Invalid Date" });
        }
    } else {
        const date = new Date();
        const unix = date.getTime();
        const utc = date.toUTCString();
        res.send({
            unix,
            utc,
        });
    }
});

app.listen(PORT, () => {
    console.log("Server running at port: " + PORT);
});
