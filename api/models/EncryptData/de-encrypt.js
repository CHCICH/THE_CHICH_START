const {EMAIL_TABLE,PASSWORD_TABLE} = require('./tables')
const EncryptedData =(data,HASHmethod)=>{
        if(HASHmethod === 'EMAIL_HASHING'){
            let hasedData = '';
            for (let i = 0 ; i<data.length;i++){
                let letter = EMAIL_TABLE[data[i]];
                if(letter !== undefined){
                    hasedData += `/${letter}/`;
                }else{
                    hasedData += `/${data[i]}/`
                }
            }
            return hasedData;
        }else if(HASHmethod === 'PASSWORD_HASING'){
            let hasedData = '';
            for (let i = 0 ; i<data.length;i++){
                let letter  = PASSWORD_TABLE[data[i]];
                if(letter !== undefined){
                    hasedData += `/${letter}/`;
                }else{
                    hasedData += `/${data[i]}/`
                }
            }
            hasedData = hasedData  + hasedData;
            return hasedData;

        }else if (HASHmethod === 'USER_HASHING'){
            const{username,password,email} = data;
            let hasedData ='';
            let uniqueID = new Date().getTime();
            hasedData += "p/<" +email[0]+ email[1]+uniqueID+username[0]+username[1] +">/p";
            return hasedData;

        }else if(HASHmethod ==='USERNAME_HASHING'){

            return data;

        }
}



module.exports = {EncryptedData}