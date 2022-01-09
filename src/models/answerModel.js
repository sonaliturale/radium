const mongoose = require ('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;

// {
//   answeredBy: {ObjectId, refs to User, mandatory},
//   text: {string, mandatory},
//   questionId: {ObjectId, refs to question, mandatory}, 
//   createdAt: {timestamp},
//   updatedAt: {timestamp},
// }
const answerSchema = new mongoose.Schema({
    
answeredBy: {
      type: ObjectId,
      ref: 'UserQuora',
      required:true
    },
    text:{
        type: String,
        required:true
    },
    questionId:{
        type: ObjectId,
      ref: 'question',
      required:true
    }
    }, { timestamps: true } )

module.exports = mongoose.model('answers',answerSchema)