const {Response,UserID,UserData} = require('../models/DataModels/UserDataModel');
const validator = require('email-validator');
const {Error,SignUpError} = require('../errors/Error');
const {readFile,writeFile} = require('fs');
const util = require('util')
const readDataBase = util.promisify(readFile);
const writeDataBase = util.promisify(writeFile);
const {EncryptedData} = require('../models/EncryptData/de-encrypt');
const {logging} = require('../utils/logging');


const spacesValidation = /\s/;
const createAccount = async (req,res)=>{
    try {
        let {newEmail, newUsername, password } = req.body;
        let AcctualUserTable = await readDataBase('../db/UserFiles/Users.json','utf-8');
        let ParsedAcctualUserTable = await JSON.parse(AcctualUserTable);
        let EmailAlreadyExists = await ParsedAcctualUserTable.find(({email}) => email === EncryptedData(newEmail,'EMAIL_HASHING'));
        let UserNameAlreadyExists = await ParsedAcctualUserTable.find(({username}) => username === newUsername);
        let thereIsNoError = validator.validate(newEmail) && !(spacesValidation.test(newUsername) ) && !EmailAlreadyExists && !UserNameAlreadyExists && newEmail.length !== 0 && newUsername.length !==0 && password.length !== 0 && password.length > 6 ;

        if(!thereIsNoError){
            let ErrorList = new SignUpError(!validator.validate(newEmail),(spacesValidation.test(newUsername)),EmailAlreadyExists,UserNameAlreadyExists,newEmail.length === 0,newUsername.length ===0, password.length === 0, password.length < 6 );
            //email error handling
            if(ErrorList.emailError){
                ErrorList.addEmailMessage("Invalid Email this email do not exist or invalid format")
            }
            if(ErrorList.EmailIsEmplty){
                ErrorList.addEmailMessage("Please enter your email");
            }
            if(ErrorList.emailAlreadyExists){
                ErrorList.addEmailMessage("there is an account with this particular email");
            }
            //username error handling 
            if(ErrorList.UserNameIsEmpty){
                ErrorList.addUsernameMessage("Please enter a username")
            }
            if(ErrorList.usernameAlreadyExists){
                ErrorList.addUsernameMessage("This username is already taken try another one")
            }
            if(ErrorList.UsernameError){
                ErrorList.addUsernameMessage("Username cannot contain Spaces");
            }
            // password error handling
            if(ErrorList.passwordIsNotLongEnough){
                ErrorList.addPasswordMessage("the password should be minimum 7 characters long")
            }
            if(ErrorList.passwordIsEmpty){
                ErrorList.addPasswordMessage("Please fill in the password to sign up");
            }

            res.status(200).json(new Error({emailError: ErrorList.EmailErrorMessage, usernameError :ErrorList.UsernameErrorMessage ,passwordError:ErrorList.PasswordErrorMessage}));

        }
        
        if(thereIsNoError){
            //save to the database and precisely to the table of users

            let UserInformation = new UserData(newUsername,password,newEmail);
            await UserInformation.createSecret();
            await ParsedAcctualUserTable.push(UserInformation);
            let FinalUserTable = await JSON.stringify(ParsedAcctualUserTable);
            await writeDataBase('../db/UserFiles/Users.json',FinalUserTable,'utf-8');
            
            //saving to the logs 
            await logging(req.time,{UserID:UserInformation.UserID},'../db/logs/UsersLogs.log','SIGN_UP')

            //
            res.status(200).json(new Response(true,new UserID(UserInformation.UserID,UserInformation.userSecret,'User was succesfully saved and registered')))
        }
    }
    catch(error){
        res.status(200).json(new Error(`an Unexpected Errror Occuered Error type: ${error}`));

    }
}

module.exports = {createAccount}