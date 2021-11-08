function printDate(){
    console.log('Today is 7th November, 2021')
}
function printMonth(){
    console.log('The current month is November')
}
 function printbatchInfo(){
     console.log('This batch is: Radium, The week is: 3, the day is: 1 and the topic of the day is Module system in')
 }

 module.exports.getDate = printDate
 module.exports.getMonth = printMonth
 module.exports.getbatchInfo = printbatchInfo