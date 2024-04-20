const directTothepath = (dirname,type) =>{
    if(type === "PUBLIC_STATIC"){
        let directory = dirname.split("\\");
        directory.pop();
        directory.pop();
        let directoryStr = '';
        directory.map(item =>{
            directoryStr += item + '\\'
        })
        return directoryStr
    }else{
        return dirname
    }
}
const SaveToLogs = ()=>{
    
}
module.exports = {directTothepath}