const {Response,UserID,UserData} = require('../models/DataModels/UserDataModel');
const validator = require('email-validator');
const {Error,SignUpError} = require('../errors/Error');
const {readFile,writeFile} = require('fs');
const util = require('util')
const readDataBase = util.promisify(readFile);
const writeDataBase = util.promisify(writeFile);
const {EncryptedData} = require('../models/EncryptData/de-encrypt');


const spacesValidation = /\s/;
const createAccount = async (req,res)=>{
    let {newEmail, newUsername, password } = req.body;
    let AcctualUserTable = await readDataBase('./db/UserFiles/Users.json','utf-8');
    let ParsedAcctualUserTable = await JSON.parse(AcctualUserTable);
    let EmailAlreadyExists = await ParsedAcctualUserTable.find(({email}) => email === EncryptedData(newEmail,'EMAIL_HASHING'));
    let UserNameAlreadyExists = await ParsedAcctualUserTable.find(({username}) => username === newUsername);
    let thereIsNoError = validator.validate(newEmail) && !(spacesValidation.test(newUsername) ) && !EmailAlreadyExists && !UserNameAlreadyExists;

    if(!thereIsNoError){
        let ErrorList = new SignUpError(!validator.validate(newEmail),(spacesValidation.test(newUsername)),EmailAlreadyExists,UserNameAlreadyExists);
        
        if(ErrorList.emailError){
            ErrorList.addEmailMessage("Invalid Email this email do not exist or invalid format")
        }

        if(ErrorList.UsernameError){
            ErrorList.addUsernameMessage("Username cannot contain Spaces");
        }
        if(ErrorList.usernameAlreadyExists){
            ErrorList.addUsernameMessage("This username is already taken try another one")
        }
        if(ErrorList.emailAlreadyExists){
            ErrorList.addEmailMessage("there is an account with this particular email");
        }

        res.status(401).send(new Error({emailError: ErrorList.EmailErrorMessage, usernameError :ErrorList.UsernameErrorMessage}));

    }
    
    if(thereIsNoError){
        let UserInformation = new UserData(newUsername,password,newEmail);
        await ParsedAcctualUserTable.push(UserInformation);
        let FinalUserTable = await JSON.stringify(ParsedAcctualUserTable);
        await writeDataBase('./db/UserFiles/Users.json',FinalUserTable,'utf-8');
        res.status(200).send(new Response(true,new UserID(UserInformation.UserID,'User was succesfully saved and registered')))
    }
}

module.exports = {createAccount}