
const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { assets, didUpdate } = require('./assetsCollection.js')
const app = express()
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Api to create and get all assets 
app.get("/assets", (req, res) => {
    const data = JSON.stringify(assets.getAssets());
    res.send(data)
})

// Streaming SSE for sending an update every second for an asset
app.get("/stream", (req, res) => {
    console.log(req.headers)
    console.log("***************\n\n")
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        // enabling CORS
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
    });

    const didUpdateSubscription = didUpdate.subscribe((val) => {
        console.log(val);
        res.write(`event: message\n`);
        res.write(`data: ${JSON.stringify(val)}\n\n`);
        console.log(new Date().getTime() + "\n")
    })

    req.on("close", (err) => {
        didUpdateSubscription.unsubscribe();
        res.end();
    });
})

app.listen(
    process.env.PORT, 
    () => console.log(`The server is listening on port ${process.env.PORT}`)
);
