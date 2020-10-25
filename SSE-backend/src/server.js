// Main file for SSE. This server emits events at one every  second.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AssetsCollection = require('./assetsCollection.js')
const app = express()
app.use(express.json());
const FREQUENCY = 1000;
let cntr = 0
var assetsCollection = new AssetsCollection();
assetsCollection.createAssets();

// Api to create and get all assets 
app.get("/assets", (req, res) =>{
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        // enabling CORS
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
    });
    assets = JSON.stringify(assetsCollection.getAssets());  
    res.json(assets)
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

    let eventInterval = setInterval(() => {
        res.write(`event: message\n`);
        console.log(cntr)
        //res.write(`data: ${JSON.stringify(assetsCollection.updateAssets())}\n\n`);
        res.write(`data: ${JSON.stringify(assetsCollection.updateAsset(cntr))}\n\n`);
        cntr++ 
        if (cntr==179){
            cntr=0
        }
        console.log(new Date().getTime() + "\n")
    }, FREQUENCY);

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
