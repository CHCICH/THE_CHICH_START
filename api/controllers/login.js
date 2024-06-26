const {Response,UserID,UserData} = require('../models/DataModels/UserDataModel');
const { EncryptedData } = require('../models/EncryptData/de-encrypt');
const {readFile,writeFile} = require('fs');
const utils = require('util');
const readTables = utils.promisify(readFile);
const writeDataBase = utils.promisify(writeFile);
const {Error,SignInError} = require('../errors/Error');
const {logging} = require('../utils/logging');


const LogIn = async (req,res)=>{
    
    
    try {
        const readDataBase = await readTables('../db/UserFiles/Users.json','utf-8');
        let DataUsersTable = await JSON.parse(readDataBase);
        const {UsernameOrEmail,password} = req.query;
        const encryptedUser = EncryptedData(UsernameOrEmail,'EMAIL_HASHING');
        let isUserTrue = await DataUsersTable.find(user => (user.email === encryptedUser) || (user.username === UsernameOrEmail));
        let passwordEnterdEncrypted = EncryptedData(password,'PASSWORD_HASING');
        const SignInErrors = new SignInError(!isUserTrue,UsernameOrEmail.length === 0, password.length === 0,( isUserTrue ? isUserTrue.password !== passwordEnterdEncrypted : true));
        console.log(isUserTrue.username)


        if(SignInErrors.EmailOrUsernameIsEmpty || SignInErrors.emailOrUsernameNotFound || SignInErrors.passwordIsEmpty){
            //email or username error
            if(SignInErrors.emailOrUsernameNotFound){
                SignInErrors.addUsernameOrEmailMessage("this email or username does not exist enter a valid email or username or create an account");
            }
            if(SignInErrors.EmailOrUsernameIsEmpty){
                SignInErrors.addUsernameOrEmailMessage("Please Enter either your username or your email");
            }
            //
            //password Error
            if(SignInErrors.passwordIsEmpty){
                SignInErrors.addPasswordMessage("Please enter your password");
            }
            //
            res.status(200).json(new Error({emailOrUsernameError:SignInErrors.UsernameOrEmailErrorMessage, PasswordError:SignInErrors.PasswordErrorMessage}))
        }else if(isUserTrue){
            
            if(SignInErrors.wrongPassword){
                if(password.length === 0 ){
                    res.status(200).json(new Error({PasswordError:"Please type your password"}))
                }else{
                    res.status(200).json(new Error({PasswordError:"wrong password please write a valid password"}));
                }
            }

            else if(isUserTrue.password === passwordEnterdEncrypted){
                //saving to the logs
                await logging(req.time,{UserID:isUserTrue.UserID},'../db/logs/UsersLogs.log','LOGIN')
                res.status(200).json(new Response(true,new UserID(isUserTrue.UserID, isUserTrue.userSecret,'User was succesfully logged in',isUserTrue.username)));

            }
        }
    }
    catch(err){
        res.status(200).json(new Error(`an Unexpected Errror Occuered Error type: ${err}`));

    }
    
}

module.exports = {LogIn};