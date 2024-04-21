const {Response,UserID,UserData} = require('../models/DataModels/UserDataModel');
const { EncryptedData } = require('../models/EncryptData/de-encrypt');
const {readFile} = require('fs');
const utils = require('util');
const readTables = utils.promisify(readFile);

const LogIn = async (req,res)=>{
    const readDataBase = await readTables('./db/UserFiles/Users.json','utf-8');
    let DataUsersTable = await JSON.parse(readDataBase);
    const {UsernameOrEmail,password} = req.body;
    const encryptedUser = EncryptedData(UsernameOrEmail,'EMAIL_HASHING');
    let isUserTrue = await DataUsersTable.find(user => (user.email === encryptedUser) || (user.username === UsernameOrEmail));

    if(isUserTrue){
        let passwordEnterdEncrypted = EncryptedData(password,'PASSWORD_HASING');
        if(passwordEnterdEncrypted === isUserTrue.password){
            res.status(200).json('error')
        }else{
            res.status(200).json('stop')
        }
    }
    
}

module.exports = {LogIn};