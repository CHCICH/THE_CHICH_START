const {readFile, writeFile} = require('fs');
const utils  = require('util');
const readDataBase = utils.promisify(readFile);
const writeDataBase = utils.promisify(writeFile);
const {EncryptedData} = require('../models/EncryptData/de-encrypt');
const {ErrorEditing,Error} = require('../errors/Error');
const validator = require('email-validator');


const editInfo = async (req,res) =>{
    const {editingInfo, UserID} = req.params;
    const readUserTable = await readDataBase('../../db/UserFiles/Users.json','utf-8');
    const usableUserTable = JSON.parse(readUserTable);
    const validUser = usableUserTable.find(user => user.UserID === UserID);
    if(validUser){

        if(editingInfo === 'email'){
            const {newEmail} = req.body;
            if(validUser.email !== EncryptedData(newEmail) ){
                let newValidUser = await validUser;
                newValidUser.email = EncryptedData(newEmail);
                const newUserTable = usableUserTable.map(user =>{
                    if(user.UserID === UserID){
                        return newValidUser;
                    }
                    return user
                });

                await writeDataBase(newUserTable,'../../db/UserFiles/Users.json','utf-8');

                // saving the login to the logs 
                let logsMessage = `${req.time} User edited his email => UserID : ${validUser.UserID}`;
                let oldDb = await readDataBase('./db/logs/UsersLogs.log','utf-8');
                logsMessage = await `${logsMessage} \n${oldDb}`;
                await writeDataBase('./db/logs/UsersLogs.log', logsMessage, 'utf-8');
                //

                res.status(200).json(newValidUser);
            }else{
                const ErrorsList = new ErrorEditing('email');

                if(validator.validate(newEmail)){
                    ErrorsList.addErrorMessage('please enter a valid email');
                }
                if(validUser.email === EncryptedData(newEmail)){
                    ErrorsList.addErrorMessage('your mail cannot be the same as the previous ');
                }
                if(newEmail.length === 0){
                    ErrorsList.addErrorMessage('Please write the email that you want to edit');
                }
                res.status(400).json(new Error({emailErrorMessage:ErrorsList.ErrorMessage}));
            }

        }else if(editingInfo === 'username'){
            const {username} = req.body;
        }else if(editingInfo === 'password'){
            const {password} = req.body;
        }

    }else{
        res.status(400).json(new Error())
    }
}

module.exports = {editInfo}