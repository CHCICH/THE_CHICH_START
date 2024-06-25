const {readFile,writeFile} = require('fs');
const utils = require('util');
const readTables = utils.promisify(readFile);
const writeDataBase = utils.promisify(writeFile);

const logging = async (time,User, logsDB,type)=>{
    let finalDescison = true;

    try{
        let logsMessage;
        if(type === "CREATE_ITEM"){
            logsMessage = `${time} User created an item => UserID : ${User.UserID} , ItemID : ${User.ItemID}`;
        }else if(type === "EDIT_ITEM"){
            logsMessage = `${time} User edited the item => UserID : ${User.UserID} , ItemID : ${User.ItemID}`;
        }else if(type === "DELETE_ITEM"){
            logsMessage = `${time} User edited the item => UserID : ${User.UserID} , ItemID : ${User.ItemID}`;
        }else if(type === "DELETE_ALL_ITEM"){
            logsMessage = `${time} User deleted all his items => UserID : ${User.UserID} `
        }else if(type === "SIGN_UP"){
            logsMessage = `${time} new User was Created => UserID : ${User.UserID}`;
        }else if(type === "LOGIN"){
            logsMessage = `${time} User logged Into his account => UserID : ${User.UserID}`;
        }else if(type === "EDIT_USER_DATA"){
            logsMessage = `${time} User edited his username => UserID : ${User.UserID}`;
        }

        let oldDb = await readTables(logsDB,'utf-8');
        logsMessage = await `${logsMessage} \n${oldDb}`;
        await writeDataBase(logsDB, logsMessage, 'utf-8');
    }catch(err){
        finalDescison = false;
    }
    return new Promise((resolve,reject)=>{
        if(finalDescison){
            resolve('log was successfully saved to the corresponding DB')
        }else{
            reject('Error in the logging DB please check the link or the req object that is being passed');
        }
    })
};
module.exports = {logging}