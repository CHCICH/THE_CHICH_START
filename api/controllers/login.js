const {Response,UserID,UserData} = require('../models/DataModels/UserDataModel');
const { EncryptedData } = require('../models/EncryptData/de-encrypt');
const {readFile,writeFile} = require('fs');
const utils = require('util');
const readTables = utils.promisify(readFile);
const writeDataBase = utils.promisify(writeFile);
const {Error,SignInError} = require('../errors/Error');

const LogIn = async (req,res)=>{
    const readDataBase = await readTables('./db/UserFiles/Users.json','utf-8');
    let DataUsersTable = await JSON.parse(readDataBase);
    const {UsernameOrEmail,password} = req.body;
    const encryptedUser = EncryptedData(UsernameOrEmail,'EMAIL_HASHING');
    let isUserTrue = await DataUsersTable.find(user => (user.email === encryptedUser) || (user.username === UsernameOrEmail));
    let passwordEnterdEncrypted = EncryptedData(password,'PASSWORD_HASING');
    const SignInErrors = new SignInError(!isUserTrue,UsernameOrEmail.length === 0, password.length === 0,( isUserTrue ? isUserTrue.password !== passwordEnterdEncrypted : true));

    try {
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
            res.status(400).json(new Error({emailOrUsernameError:SignInErrors.UsernameOrEmailErrorMessage, passwordErrror:SignInErrors.PasswordErrorMessage}))
        }else if(isUserTrue){

            if(SignInErrors.wrongPassword){
                res.status(400).json(new Error({PasswordError:"wrong password please write a valid password"}));
            }

            else if(isUserTrue.password === passwordEnterdEncrypted){

                // saving the login to the logs 
                let logsMessage = `${req.time} User logged Into his account => UserID : ${isUserTrue.UserID}`;
                let oldDb = await readTables('./db/logs/UsersLogs.log','utf-8');
                logsMessage = await `${logsMessage} \n${oldDb}`;
                await writeDataBase('./db/logs/UsersLogs.log', logsMessage, 'utf-8');
                //
                res.status(200).json(new Response(true,new UserID(isUserTrue.UserID, isUserTrue.userSecret,'User was succesfully logged in')));

            }
        }
    }
    catch(err){
        console.log(err)
    }
    
}

module.exports = {LogIn};