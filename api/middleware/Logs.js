const DateForLog = (req , res , next) =>{
    let Year = new Date().getUTCFullYear();
    let Month = new Date().getUTCMonth();
    let Day = new Date().getUTCDate();
    let Hour = new Date() .getUTCHours();
    let Minutes = new Date().getUTCMinutes();
    let seconds = new Date().getUTCSeconds();
    let FullTimeAndDate = `${Year}-${Month}-${Day} ${Hour}:${Minutes}:${seconds} `
    req.time = FullTimeAndDate;
    next();
}
module.exports = {DateForLog}