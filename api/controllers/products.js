const {Item} = require('../models/DataModels/ItemModel');
const {readFile,writeFile} = require('fs');
const utils = require('util');
const readTables = utils.promisify(readFile);
const writeDataBase = utils.promisify(writeFile);
const {Error} = require('../errors/Error')


const createNewItem = async (req,res)=>{
    const {UserID,NameOfTheItem, price,descOftheItem, imageOftheItem} = req.body;
    const userTable = await readTables('./db/UserFiles/Users.json');
    const usableUserTable = await JSON.stringify(userTable);
    const UserExists = usableUserTable.find(user => user.UserID === UserID);
    const ErrorList = {
        NameIsEmpty : NameOfTheItem.length === 0,
        NameIsTooShort : NameOfTheItem.length < 5,
        priceIsEmpty: price.length === 0,
        priceIsaUsableNumber : `${Number(price)}` === price
    }
    const thereIsAnError = ErrorList.NameIsEmpty || ErrorList.NameIsTooShort || ErrorList.priceIsEmpty || ErrorList.priceIsaUsableNumber;

    if(UserExists){
        if(thereIsAnError){
            //error handling
            const listOfcurrentError = {};
            if(ErrorList.NameIsEmpty){
                
            }
        }else{

        }
        
    }else{
        res.status(404).json(new Error('User was not found'));
    }

}

module.exports = {createNewItem};