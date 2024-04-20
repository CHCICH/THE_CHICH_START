
class Error{
    constructor(message){
        this.success = false;
        this.message = message;
    }
    noDataAvailable(){
        this.message = "no data is available";
    }
    noSuchRoutes(){
        this.message = "no Routes available"
    }
};

class SignUpError{
    constructor(emailError , UsernameError,emailAlreadyExists,usernameAlreadyExists){
        this.emailError = emailError;
        this.UsernameError = UsernameError;
        this.emailAlreadyExists = emailAlreadyExists;
        this.usernameAlreadyExists = usernameAlreadyExists;
    }
    addUsernameMessage(msg){
        this.UsernameErrorMessage = msg;
    }
    addEmailMessage(msg){
        this.EmailErrorMessage = msg;
    }
    
}

module.exports = {Error,SignUpError}