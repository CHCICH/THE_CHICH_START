const { Error} = require('../errors/Error');
const splitStringWithRegex = (str) => str.split(/\//);
const {readFile,writeFile} = require('fs');
const utils = require('util');
const readTables = utils.promisify(readFile);
const writeDataBase = utils.promisify(writeFile);
const uniqid = require('uniqid');

const auth_101 = async (req,res,next)=>{
    const {API_KEY} = req.query;
    const headerAPI_KEY = req.headers['x-authorization'];
    const keysAreTheSame = API_KEY === headerAPI_KEY || (!API_KEY && headerAPI_KEY) || (!headerAPI_KEY && API_KEY);
    // this is a validation that the user provided either the same api key in the url or only one in the url or only one in the header 
    const link = req.url;
    const linkSeperated = splitStringWithRegex(link);
    const linkIsApi = linkSeperated[1] === 'api';
    if(linkIsApi){
        let current_api_key;
        if(headerAPI_KEY){
            current_api_key = headerAPI_KEY;
        }else{
            current_api_key = API_KEY;
        }
        if(keysAreTheSame){
            const key_list = await readTables('../db/auth/authKey.json','utf-8');
            const api_key_is_valid = (JSON.parse(key_list)).find(item => item === current_api_key);
            if (api_key_is_valid){
                next();
            }else{
                res.status(202).json(new Error("you need to specify a correct API_KEY either at the end of the url's request or in the header through the key => x-authorization"));
            }
        }else{
            res.status(202).json(new Error("please specify an API_KEY or make sure that the api key in the header and in the url link are the same"))
        }
    }else{
        next();
    }
};

const generateAnAPIkey = async () =>{
    const new_Api_key = uniqid();
    const apiTable = await readTables('../db/auth/authKey.json','utf-8');
    const newTable = [...(JSON.parse(apiTable),new_Api_key)];
    await writeDataBase('../db/auth/authKey.json',JSON.stringify(newTable),'utf-8');
    return new_Api_key;
}


module.exports = {auth_101}