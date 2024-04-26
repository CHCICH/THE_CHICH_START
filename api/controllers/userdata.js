const {readFile, writeFile} = require('fs');
const utils  = require('util');
const readDataBase = utils.promisify(readFile);
const writeDataBase = utils.promisify(writeFile);
const {EncryptedData} = require('../models/EncryptData/de-encrypt');
const {ErrorEditing,Error} = require('../errors/Error');
const validator = require('email-validator');
const {Response} = require('../models/DataModels/UserDataModel');


const editInfo = async (req,res) =>{
    const {editingInfo, UserID} = req.query;
    const readUserTable = await readDataBase('./db/UserFiles/Users.json','utf-8');
    const usableUserTable = JSON.parse(readUserTable);
    const validUser = usableUserTable.find(user => user.UserID === UserID);
    console.log(req.query)
    if(validUser){
        if(editingInfo === 'email'){
            const {newEmail} = req.body;
            const thereIsAnError = !validator.validate(newEmail) || validUser.email === EncryptedData(newEmail) || newEmail.length === 0
            if(thereIsAnError){
                // error handling 
                const ErrorsList = new ErrorEditing('email');

                if(!validator.validate(newEmail)){
                    ErrorsList.addErrorMessage('please enter a valid email');
                }
                if(validUser.email === EncryptedData(newEmail)){
                    ErrorsList.addErrorMessage('your mail cannot be the same as the previous ');
                }
                if(newEmail.length === 0){
                    ErrorsList.addErrorMessage('Please write the email that you want to edit');
                }
                res.status(400).json(new Error({emailErrorMessage:ErrorsList.ErrorMessage}));
            }else{
                
                let newValidUser = await validUser;
                newValidUser.email = EncryptedData(newEmail);
                const newUserTable = usableUserTable.map(user =>{if(user.UserID === UserID){return newValidUser;}return user});
                //saving data to the db 
                await writeDataBase('./db/UserFiles/Users.json',newUserTable,'utf-8');
                //
                // saving the login to the logs 
                let logsMessage = `${req.time} User edited his email => UserID : ${validUser.UserID}`;
                let oldDb = await readDataBase('./db/logs/UsersLogs.log','utf-8');
                logsMessage = await `${logsMessage} \n${oldDb}`;
                await writeDataBase('./db/logs/UsersLogs.log', logsMessage, 'utf-8');
                //

                res.status(200).json(new Response(true,newValidUser));
            }

        }else if(editingInfo === 'username'){
            const {username} = req.body;
            const spacesValidation = /\s/;
            const thereIsAnError = username === validUser.username || username.length === 0 || (spacesValidation.test(username));
            if(thereIsAnError){
                // error handling 
                const ErrorsList = new ErrorEditing('email');

                if((spacesValidation.test(username))){
                    ErrorsList.addErrorMessage('please enter a valid username that do not contain spaces');
                }
                if(username === validUser.username){
                    ErrorsList.addErrorMessage('your username cannot be the same as the previous ');
                }
                if(username.length === 0){
                    ErrorsList.addErrorMessage('Please write the username that you want to edit');
                }
                res.status(400).json(new Error({emailErrorMessage:ErrorsList.ErrorMessage}));
            }else{
                let newValidUser = await validUser;
                newValidUser.username = username;
                const newUserTable = usableUserTable.map(user =>{if(user.UserID === UserID){return newValidUser;}return user});
                //saving data to the db 
                await writeDataBase('./db/UserFiles/Users.json',JSON.stringify(newUserTable),'utf-8');
                //
                // saving the login to the logs 
                let logsMessage = `${req.time} User edited his username => UserID : ${validUser.UserID}`;
                let oldDb = await readDataBase('./db/logs/UsersLogs.log','utf-8');
                logsMessage = await `${logsMessage} \n${oldDb}`;
                await writeDataBase('./db/logs/UsersLogs.log', logsMessage, 'utf-8');
                //

                res.status(200).json(new Response(true,newValidUser));
            
            }
        }else if(editingInfo === 'password'){
            const {password} = req.body;
        }

    }else{
        res.status(405).json(new Error('user was not found'));
    }
}

const editEmail = ()=>{
    
}
module.exports = {editInfo}


