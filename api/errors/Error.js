
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

class ErrorEditing{
    constructor(type){
        this.type = type;
    }
    addErrorMessage(msg){
        this.ErrorMessage = msg;
    }
}

class SignUpError{
    constructor(emailError , UsernameError,emailAlreadyExists,usernameAlreadyExists, EmailIsEmplty,UserNameIsEmpty, passwordIsEmpty, passwordIsNotLongEnough){
        this.emailError = emailError;
        this.UsernameError = UsernameError;
        this.emailAlreadyExists = emailAlreadyExists;
        this.usernameAlreadyExists = usernameAlreadyExists;
        this.EmailIsEmplty = EmailIsEmplty;
        this.UserNameIsEmpty = UserNameIsEmpty;
        this.passwordIsEmpty = passwordIsEmpty;
        this.passwordIsNotLongEnough = passwordIsNotLongEnough;
    }
    addUsernameMessage(msg){
        this.UsernameErrorMessage = msg;
    }
    addEmailMessage(msg){
        this.EmailErrorMessage = msg;
    }
    addPasswordMessage(msg){
        this.PasswordErrorMessage = msg;
    }
    
}
class SignInError{
    constructor(emailOrUsernameNotFound, EmailOrUsernameIsEmpty, passwordIsEmpty,wrongPassword){
        this.emailOrUsernameNotFound = emailOrUsernameNotFound;
        this.EmailOrUsernameIsEmpty = EmailOrUsernameIsEmpty;
        this.wrongPassword = wrongPassword;
        this.passwordIsEmpty = passwordIsEmpty;
    }
    ErrorExists(){
        return this.EmailOrUsernameIsEmpty && this.emailOrUsernameNotFound && this.passwordIsEmpty;
    }
    addUsernameOrEmailMessage(msg){
        this.UsernameOrEmailErrorMessage = msg;

    }
    addPasswordMessage(msg){
        this.PasswordErrorMessage = msg;

    }
}

module.exports = {Error,SignUpError,SignInError, ErrorEditing}