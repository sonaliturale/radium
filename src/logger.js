function log(name){
    console.log('The name is ' +name)
}
function Welcome(){
    console.log ('Welcome to my application')
}
let url = "https://www.google.com"

module.exports.logMessage = log
module.exports.printWelcomeMessage = Welcome

module.exports.loggerEndpoint = url
