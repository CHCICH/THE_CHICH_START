const {Response,UserID,UserData} = require('../models/DataModels/UserDataModel');
const { EncryptedData } = require('../models/EncryptData/de-encrypt');
const {readFile} = require('fs');
const utils = require('util');
const readTables = utils.promisify(readFile);
const {Error,SignInError} = require('../errors/Error');

const LogIn = async (req,res)=>{
    const readDataBase = await readTables('./db/UserFiles/Users.json','utf-8');
    let DataUsersTable = await JSON.parse(readDataBase);
    const {UsernameOrEmail,password} = req.body;
    const encryptedUser = EncryptedData(UsernameOrEmail,'EMAIL_HASHING');
    let isUserTrue = await DataUsersTable.find(user => (user.email === encryptedUser) || (user.username === UsernameOrEmail));
    let passwordEnterdEncrypted = EncryptedData(password,'PASSWORD_HASING');
    const SignInErrors = new SignInError(!isUserTrue,UsernameOrEmail.length === 0, password.length === 0,isUserTrue.password !== passwordEnterdEncrypted);

    if(SignInErrors.ErrorExists()){
        if(SignInErrors.EmailOrUsernameIsEmpty){
            SignInErrors.addUsernameOrEmailMessage("")
        }
        if(SignInErrors.passwordIsEmpty){
            SignInErrors.addPasswordMessage("")
        }
        if(SignInErrors.emailOrUsernameNotFound){

        }
        res.status(400).json(new Error({emailOrUsernameError:SignInErrors.UsernameOrEmailErrorMessage, passwordErrror:SignInErrors.PasswordErrorMessage}))
    }

    if(isUserTrue){
        if(SignInErrors.wrongPassword){
            res.status(200).json('error')
        }
    }
    
}

module.exports = {LogIn};