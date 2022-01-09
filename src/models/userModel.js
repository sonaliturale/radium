const mongoose=require('mongoose')

// { 
//     fname: {string, mandatory},
//     lname: {string, mandatory},
//     email: {string, mandatory, valid email, unique},
//     phone: {string, not mandatory, unique, valid Indian mobile number}, 
//     password: {string, mandatory, minLen 8, maxLen 15}, // encrypted password
//     createdAt: {timestamp},
//     updatedAt: {timestamp}
//   }


const userSchema=new mongoose.Schema({
    "fname": {
        type: String,
        required: true
    },
    "lname": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
        },
    "phone": {
        type: String,
        unique: true,
        },
     "password": {
        type: String,
        required: true
       
    },
     "creditScore": {
         type:Number, 
         required: true
         },

}, {timestamps: true} )

module.exports=mongoose.model('UserQuora',userSchema)







