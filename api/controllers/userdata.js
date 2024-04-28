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
    try{
        if(validUser){
            if(editingInfo === 'email'){
                const {newEmail} = req.body;
                const thereIsAnError = !validator.validate(newEmail) || validUser.email === EncryptedData(newEmail,'EMAIL_HASHING') || newEmail.length === 0
                const errorList = {
                    firstError:(!validator.validate(newEmail)),
                    firstErrorMessage:'please enter a valid email',
                    secondError:validUser.email === EncryptedData(newEmail,'EMAIL_HASHING'),
                    secondErrorMessage:'your mail cannot be the same as the previous ',
                    thirdError:newEmail.length === 0,
                    thirdErrorMessage:'Please write the email that you want to edit'
                }
                await editData(res,req,thereIsAnError,errorList,validUser,newEmail,'email',UserID,usableUserTable);

            }else if(editingInfo === 'username'){
                const {username} = req.body;
                const spacesValidation = /\s/;
                const thereIsAnError = username === validUser.username || username.length === 0 || (spacesValidation.test(username));
                const errorList = {
                    firstError:(spacesValidation.test(username)),
                    firstErrorMessage:'please enter a valid username that do not contain spaces',
                    secondError:username === validUser.username,
                    secondErrorMessage:'your username cannot be the same as the previous ',
                    thirdError:username.length === 0,
                    thirdErrorMessage:'Please write the username that you want to edit'
                }
                await editData(res,req,thereIsAnError,errorList,validUser,username,'username',UserID,usableUserTable);

            }else if(editingInfo === 'password'){
                const {password} = req.body;
                const thereIsAnError = password === EncryptedData(validUser.password,'PASSWORD_HASING') || password.length === 0 || password.length <6;
                const errorList = {
                    firstError:password.length <6,
                    firstErrorMessage:'please enter a valid password that is more than 6 characters',
                    secondError:password === EncryptedData(validUser.password,'PASSWORD_HASING') ,
                    secondErrorMessage:'your password cannot be the same as the previous ',
                    thirdError:password.length === 0,
                    thirdErrorMessage:'Please write the username that you want to edit'
                };
                await editData(res,req,thereIsAnError,errorList,validUser,password,'password',UserID,usableUserTable);

            }

        }else{
            res.status(405).json(new Error('user was not found'));
        }
    }
    catch(error){
        console.log(error)
    }
}

const editData = async (res,req,thereIsAnError,errorList,validUser,editingdata,editingInfo,UserID,usableUserTable)=>{
    if(thereIsAnError){
        // error handling 
        const ErrorsList = new ErrorEditing('email');

        if(errorList.firstError){
            ErrorsList.addErrorMessage(errorList.firstErrorMessage);
        }
        if(errorList.secondError){
            ErrorsList.addErrorMessage(errorList.secondErrorMessage);
        }
        if(errorList.thirdError){
            ErrorsList.addErrorMessage(errorList.thirdErrorMessage);
        }
        res.status(400).json(new Error({emailErrorMessage:ErrorsList.ErrorMessage}));
    }else{

        //choosing the editing mode 
        let newValidUser = await validUser;
        if(editingInfo === 'username'){
            newValidUser.username = editingdata;
        }else if(editingInfo === "email"){
            newValidUser.email = EncryptedData(editingdata,'EMAIL_HASHING');
        }else if(editingInfo === "password"){
            newValidUser.password = EncryptedData(editingdata   ,'PASSWORD_HASING');
        }
        // creating a new added table 
        const newUserTable = usableUserTable.map(user =>{if(user.UserID === UserID){return newValidUser;}return user});
        //saving data to the db 
        await writeDataBase('./db/UserFiles/Users.json',JSON.stringify(newUserTable),'utf-8');
        //
        // saving the action to the logs 
        let logsMessage = `${req.time} User edited his username => UserID : ${validUser.UserID}`;
        let oldDb = await readDataBase('./db/logs/UsersLogs.log','utf-8');
        logsMessage = await `${logsMessage} \n${oldDb}`;
        await writeDataBase('./db/logs/UsersLogs.log', logsMessage, 'utf-8');
        //

        res.status(200).json(new Response(true,newValidUser));
    
    }
}
module.exports = {editInfo}
