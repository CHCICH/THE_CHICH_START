const {Item} = require('../models/DataModels/ItemModel');
const {Response} = require('../models/DataModels/UserDataModel');
const {readFile,writeFile} = require('fs');
const utils = require('util');
const readTables = utils.promisify(readFile);
const writeDataBase = utils.promisify(writeFile);
const {Error} = require('../errors/Error')


const createNewItem = async (req,res)=>{
    
    try{
        const {UserID,NameOfTheItem, price,descOftheItem, imageOftheItem} = req.body;
        const userTable = await readTables('./db/UserFiles/Users.json');
        const usableUserTable = await JSON.parse(userTable);
        const UserExists = usableUserTable.find(user => user.UserID === UserID);
        const ErrorList = {
            NameIsEmpty : NameOfTheItem.length === 0,
            NameIsTooShort : NameOfTheItem.length < 5,
            priceIsEmpty: price.length === 0,
            priceIsaUsableNumber : `${Number(price)}` !== price
        }
        const thereIsAnError = ErrorList.NameIsEmpty || ErrorList.NameIsTooShort || ErrorList.priceIsEmpty || ErrorList.priceIsaUsableNumber;
        if(UserExists){
            if(thereIsAnError){
                //error handling
                const listOfcurrentError = {};
                if(ErrorList.NameIsTooShort){
                    listOfcurrentError.NameErrorMessage = 'the name should be a minimum of 5 characters';
                }
                if(ErrorList.NameIsEmpty){
                    listOfcurrentError.NameErrorMessage = 'please enter the name of the product';
                }
                if(ErrorList.priceIsaUsableNumber){
                    listOfcurrentError.PriceErrorMessage = 'please enter a number or a usable price and not a character';
                }
                if(ErrorList.priceIsEmpty){
                    listOfcurrentError.PriceErrorMessage = 'Please enter the price of your product';
                }

                res.status(400).json(new Error(listOfcurrentError))
            }else{
                // saving to the items tables 
                const newItem = new Item(UserID,NameOfTheItem,price,descOftheItem,imageOftheItem);
                const itemsTable = await readTables('./db/UserFiles/items.json','utf-8');
                const usableItemsTable = await JSON.parse(itemsTable);
                await usableItemsTable.push(newItem);
                const finalItemTable = await JSON.stringify(usableItemsTable);
                await writeDataBase('./db/UserFiles/items.json',finalItemTable,'utf-8');
                //
                // saving the login to the logs 
                let logsMessage = `${req.time} User created an item => UserID : ${UserExists.UserID} , ItemID : ${newItem.ItemID}`;
                let oldDb = await readTables('./db/logs/UsersLogs.log','utf-8');
                logsMessage = await `${logsMessage} \n${oldDb}`;
                await writeDataBase('./db/logs/UsersLogs.log', logsMessage, 'utf-8');
                //
                res.status(200).json(new Response(true,newItem))
            }
            
        }else{
            res.status(404).json(new Error('User was not found'));
        }
    }
    catch(error){
        res.status(400).json(new Error(`an Unexpected Errror Occuered Error type: ${error}`));
    }

}
const editItem = async (req,res) =>{
    try{
        const {name, price, desc,image,UserID} = req.body;
        const {ItemID} = req.params;
        const ItemsTable = await readTables('./db/UserFiles/items.json','utf-8');
        const usableItemsTable = await JSON.parse(ItemsTable);
        const ValidItem = usableItemsTable.find(item => item.ItemID === ItemID);

        if(UserID === ValidItem.AuthorUserID){
            if (ValidItem){
                const ErrorList = {
                    NameIsEmpty : name.length === 0,
                    NameIsTooShort : name.length < 5,
                    priceIsEmpty: price.length === 0,
                    priceIsaUsableNumber : `${Number(price)}` !== price
                };
                const thereIsAnError = ErrorList.NameIsEmpty || ErrorList.NameIsTooShort || ErrorList.priceIsEmpty || ErrorList.priceIsaUsableNumber;

                if(thereIsAnError){
                    //error handling
                    const listOfcurrentError = {};
                    if(ErrorList.NameIsTooShort){
                        listOfcurrentError.NameErrorMessage = 'the name should be a minimum of 5 characters';
                    }
                    if(ErrorList.NameIsEmpty){
                        listOfcurrentError.NameErrorMessage = 'please enter the name of the product';
                    }
                    if(ErrorList.priceIsaUsableNumber){
                        listOfcurrentError.PriceErrorMessage = 'please enter a number or a usable price and not a character';
                    }
                    if(ErrorList.priceIsEmpty){
                        listOfcurrentError.PriceErrorMessage = 'Please enter the price of your product';
                    }
    
                    res.status(400).json(new Error(listOfcurrentError))
                }else{
                    const newItemsTable = usableItemsTable.map(item => {
                        if(item.ItemID === ItemID){
                            let newItem = item;
                            newItem.price = price;
                            newItem.NameOfTheItem = name;
                            newItem.descOfTheItem = desc;
                            newItem.imageOftheItem = image;
                            return newItem;
                        }
                        return item
                    });
                    const newFinalItemsTable = JSON.stringify(newItemsTable);
                    await writeDataBase('./db/UserFiles/items.json',newFinalItemsTable,'utf-8');
                    //
                    // saving the login to the logs 
                    let logsMessage = `${req.time} User edited the item => UserID : ${UserID} , ItemID : ${ItemID}`;
                    let oldDb = await readTables('./db/logs/UsersLogs.log','utf-8');
                    logsMessage = await `${logsMessage} \n${oldDb}`;
                    await writeDataBase('./db/logs/UsersLogs.log', logsMessage, 'utf-8');
                    //
                    const finalResponse = new Item(ValidItem.AuthorUserID,name,price,desc,image);
                    finalResponse.editItemIDtoDefault(ItemID);
                    res.status(200).json(new Response(true,finalResponse));
                }            
            }else{
                res.status(404).json(new Error('Item was not found'))
            }

        }else{
            res.status(400).json(new Error('Item only can be edited by its author'))
        }
    }
    catch(error){
        res.status(400).json(new Error(`An unexpected error occurer error type ${error}`));
    }
}

 

module.exports = {createNewItem,editItem};