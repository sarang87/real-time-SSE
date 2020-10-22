const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const AssetsCollection = require('./assetsCollection.js')
const request = require('request');


// Setting up the views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs')

// Setting up the static assets
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

var assetsCollection = new AssetsCollection();
assetsCollection.createAssets();
assetsCollection.viewAssets();


function fn2sec() {
    var myJSONObject = assetsCollection.updateAssets();
    //var myJSONObject2 = JSON.stringify({ "name":"John", "age":30, "car":null })
    console.log(myJSONObject)
    request({
        url: "http://localhost:3000",
        method: "POST",
        json: true,
        body: myJSONObject
    }, function (error, response, body) {
        console.log('response sent');
    });

}

setInterval(fn2sec, 2* 1000)

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  //res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
     {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    }
   
  );

  next();
});

app.get('', (req, res) => {
    res.send('Currency exchange')
})

app.get('/help', (req, res) => {
    res.render('help',
        {
            Contact: 'Sarang Joshi'
        })
})

app.get('/about', (req, res) => {
    res.render('about')
})



const PORT = 4000
app.listen(PORT, () => {
    //console.log('Server is running on port ' + PORT)
})
