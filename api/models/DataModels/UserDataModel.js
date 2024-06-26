const {EncryptedData} = require('../EncryptData/de-encrypt');
const uniqid = require('uniqid');

class UserData{
    constructor(username,password,email){
        this.UserID = EncryptedData({username,password,email},'USER_HASHING');
        this.username = EncryptedData(username,'USERNAME_HASHING' );
        this.password = EncryptedData(password,'PASSWORD_HASING');
        this.email = EncryptedData(email,'EMAIL_HASHING');
        
    }
    createSecret(){
        this.userSecret = uniqid() + this.UserID;
    }
}

class Item{
    constructor(ProductID, ProductName, Price, description, photoLink){
        this.ProductID = ProductID;
        this.ProductName = ProductName;
        this.Price = Price;
        this.description = description;
        this.photoLink = photoLink;
    }
}

class Cart{
    constructor(UserID){
        this.UserID = UserID;
        this.Cart = [];
    }
    addItemToCart(itemID){
        let NewCart = this.Cart;
        NewCart.append(itemID);
        this.Cart = NewCart;
    }
    removeItemToCart(itemID){
        let NewCart = this.Cart;
        NewCart.filter(itemID);
    }
    
}

class Response {
    constructor(success, data){
        this.success = success;
        this.data = data;
    }
}
class UserID{
    constructor(UserID,userSecret,msg,username){
        this.UserID = UserID;
        this.userSecret = userSecret;
        this.username = username;
        this.msg = msg;
    }
}
module.exports = {Response,Cart,Item,UserData,UserID}