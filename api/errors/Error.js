class Errror{
    constructor(){
        this.success = false;
        this.message;
    }
    noDataAvailable(){
        this.message = "no data is available";
    }
    noSuchRoutes(){
        this.message = "no Routes available"
    }
};