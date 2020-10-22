const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AssetsCollection = require('./assetsCollection.js')
const app = express()
app.use(express.json());

var assetsCollection = new AssetsCollection();
assetsCollection.createAssets();
assetsCollection.viewAssets();

app.get("/stream", (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",

        // enabling CORS
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
    });

    let eventInterval = setInterval(() => {
        res.write(`event: message\n`);
        console.log(JSON.stringify(assetsCollection.updateAssets()))
        res.write(`data: ${JSON.stringify(assetsCollection.updateAssets())}\n\n`);
    }, 2000);

    req.on("close", (err) => {
        clearInterval(eventInterval);
        res.end();
    });
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 8000;

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));
