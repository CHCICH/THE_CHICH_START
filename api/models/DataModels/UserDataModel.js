const {EncryptedData} = require('../EncryptData/de-encrypt');

class UserData{
    constructor(username,password,email){
        this.UserID = EncryptedData({username,password,email},'USER_HASHING');
        this.username = EncryptedData(username,'USERNAME_HASHING' );
        this.password = EncryptedData(password,'PASSWORD_HASING');
        this.email = EncryptedData(email,'EMAIL_HASHING');
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
        NewCart.filter(item);
    }
    
}

class Response {
    constructor(success, data){
        this.success = success;
        this.data = data;
    }
}
class UserID{
    constructor(UserID,msg){
        this.UserID = UserID;
        this.msg = msg;
    }
}
module.exports = {Response,Cart,Item,UserData,UserID}