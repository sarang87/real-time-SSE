const Asset = require('./asset.js')
const currencyCodes = ['AED', 'AFN', 'INR', 'CAD', 'USD']
const MAX = 100;
const NUM_ASSETS = 5

class AssetsCollection {
    constructor() {
        this.assetsList = []
    }

    createAssets() {
        console.log('Creating assests...\n')
        for (var i = 0; i < NUM_ASSETS; i++) {
            const ts = getTimeStamp();
            const cc = getCurrencyCode(i);
            const br = getBaseRate();
            var asset = new Asset(i, cc, br, ts, 'currency')
            this.assetsList.push(asset)
        }

    }

    updateAssets() { 
        var resultJSON = []       
        for (var i = 0; i < NUM_ASSETS; i++) {
            const newTS = getTimeStamp()
            const newRate = getNewRate(this.assetsList[i].price)           
            this.assetsList[i].updateAsset(newRate,newTS)
            resultJSON.push(this.assetsList[i].toJSON())
        }
        //return this.assetsList
        return resultJSON
    }

    viewAssets() {
        console.log("**** Current assets prices ****")
        for (var i = 0; i < NUM_ASSETS; i++) {
            this.assetsList[i].viewAsset()
        }

    }
}

// helper method to get the current timestamp
const getTimeStamp = () => {
    return new Date().getTime()
};

// helper function to get the new rate from the old rate which can increase or decrease
const getNewRate = (oldRate) => {
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    newRate = oldRate +   (plusOrMinus * oldRate * Math.random() * 0.1)    
    return newRate
}

// helper method to get the currency code
const getCurrencyCode = (idx) => {
    return currencyCodes[idx]
}

// helper method to get the base exchange rate while setting up the assets
const getBaseRate = () => {
    return Math.random() * Math.floor(MAX)
}



module.exports = AssetsCollection;



