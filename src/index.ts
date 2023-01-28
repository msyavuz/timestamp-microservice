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
    let date = new Date();

    if (q) {
        if (isNaN(+q)) {
            date = new Date(q);
            if (date.toUTCString() === "Invalid Date") {
                res.send({
                    error: "Invalid Date",
                });
            } else {
                res.send({
                    unix: date.getTime(),
                    utc: date.toUTCString(),
                });
            }
        } else {
            date = new Date(q);
            res.send({
                unix: date.getTime(),
                utc: date.toUTCString(),
            });
        }
    }
});

app.listen(PORT, () => {
    console.log("Server running at port: " + PORT);
});
