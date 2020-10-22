
// Single asset 
class Asset {
    constructor(id, assetName, price, lastUpdate, type) {
        this.id = id
        this.assetName = assetName // "USD", Samsung Electronics Co Ltd : "SSNLF"
        this.price = price // asset current price relative to USD
        this.lastUpdate = lastUpdate// unix timestamp
        this.type = type // asset type Currency (e.g. USD, EUR...) or Stock (Samsung, Google)
    }

    updateAsset(newPrice, updateTime) {

        this.price = newPrice;
        this.lastUpdate = updateTime

    }

    
    toJSON(){
        var result = {
            id: this.id,
            assetName : this.assetName,
            price:this.price,
            lastUpdate:this.lastUpdate,
            type:this.type
        }
        return result
        
    }

    viewAsset() {
        
        console.log(this.assetName)
        console.log(this.price)
        console.log(this.lastUpdate)
        console.log("\n")
    }
}


module.exports = Asset;