const Asset = require('./asset.js')
const currencyCodes= require('./dataSource.js')
const NUM_ASSETS = 180
const MAX = 100;


// Class to hold a collection of assets. 
class AssetsCollection {
    constructor() {
        this.assetsList = []
    }

    createAssets() {
        console.log('Creating assests...\n')
        for (var i = 0; i < NUM_ASSETS; i++) {
            const ts = this.getTimeStamp();
            const cc = this.getCurrencyCode(i);
            const br = this.getBaseRate();
            var asset = new Asset(i, cc, br, ts, 'currency')
            this.assetsList.push(asset)
        }

    }

    updateAsset(idx) {

        var result = []
        const newTS = this.getTimeStamp()
        const newRate = this.getNewRate(this.assetsList[idx].price)
        this.assetsList[idx].updateAsset(newRate, newTS)
        result.push(this.assetsList[idx].toJSON())
        //return this.assetsList
        console.log(result)
        return result
    }

    viewAssets() {
        console.log("**** Current assets prices ****")
        for (var i = 0; i < NUM_ASSETS; i++) {
            this.assetsList[i].viewAsset()
        }
    }

    getAssets() {
        console.log("**** Get Assets ****")
        var result = []
        for (var i = 0; i < NUM_ASSETS; i++) {
            result.push(this.assetsList[i].toJSON())
        }
        //return this.assetsList
        return result
    }


    // helper method to get the current timestamp
    getTimeStamp (){
        return new Date().getTime()
    };

    // helper function to get the new rate from the old rate which can increase or decrease
    getNewRate(oldRate){
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        let newRate = oldRate + (plusOrMinus * oldRate * Math.random() * 0.1)
        return newRate
    }

    // helper method to get the currency code
    getCurrencyCode(idx){
        return currencyCodes[idx]
    }

    // helper method to get the base exchange rate while setting up the assets
    getBaseRate(){
        return Math.random() * Math.floor(MAX)
    }

}

module.exports = AssetsCollection;



