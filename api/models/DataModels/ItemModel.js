
const uniqid = require('uniqid');

class Item{
    constructor(AuthorUserID,NameOfTheItem, price, descOfTheItem, imageOftheItem ){
        this.AuthorUserID = AuthorUserID;
        this.NameOfTheItem = NameOfTheItem;
        this.price = price;
        this.descOfTheItem = descOfTheItem;
        this.imageOftheItem = imageOftheItem;
        this.ItemID = uniqid();
    }
}

module.exports = {Item};