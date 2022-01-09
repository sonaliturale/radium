const answerModel = require('../models/answerModel')
const questionModel = require('../models/questionModel')
const UserModel = require('../models/userModel')
const ObjectId = require('mongoose').Types.ObjectId;

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.length === 0) return false
    return true;
}

const createAnswer = async (req, res) => {
    try {
        let userBody = req.body
        let { answeredBy, text, questionId } = userBody
        if (!isValidRequestBody(userBody)) {
            return res.status(400).send({ status: false, message: "Please provide data for successful registration" });
        }
        if (!isValid(answeredBy)) {
            return res.status(400).send({ status: false, message: "Please provide answeredBy field" });
        }
        if (!isValid(questionId)) {
            return res.status(400).send({ status: false, message: "Please provide questionId field" });
        }
        if (!isValid(text)) {
            return res.status(400).send({ status: false, message: "Please provide text field" });
        }
        const user = await UserModel.findOne({ _id: answeredBy })
        let checkid = ObjectId.isValid(answeredBy);
        if (!checkid) {
            return res.status(400).send({ status: false, message: "Please provide a valid userId " })
        }
        let checkque = ObjectId.isValid(questionId);
        if (!checkque) {
            return res.status(400).send({ status: false, message: "Please provide a valid questionId " })
        }
        const quesn = await questionModel.findOne({ _id: questionId })
        if (!quesn) {
            return res.status(404).send({ status: false, msg: "Id is not there in DB" })
        }
        if (quesn.askedBy == answeredBy) {
            res.status(400).send({ status: false, message: `You can't answer your own Question` })
            return
        }
        if (req.userId != answeredBy) {
            return res.status(400).send({ status: false, message: "Sorry you are not authorized to do this action" })
        }
        
        await UserModel.findOneAndUpdate({ _id: answeredBy }, { creditScore: user.creditScore + 200 }, { new: true })
        const data = await answerModel.create(req.body)
        return res.status(201).send({ status: true, message: "successfully", data })

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const getdetails = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        checkId = ObjectId.isValid(questionId)
        if (!checkId) {
            return res.status(400).send({ status: false, message: "Please provide a valid questionId " })
        }


        const SearchquestionId = await questionModel.findOne({ _id: questionId, isDeleted: false })
        if (!SearchquestionId) {
            return res.status(404).send({ status: false, message: `Answer is not found with given questionId` })
        }
        const answer = await answerModel.find({ questionId: questionId,isDeleted:false}).sort({"createdAt":-1})

        if (!answer) {
            return res.status(404).send({ status: false, message: `answer does not exit` })
        }
        return res.status(200).send({ status: true, message: 'Success', data: answer })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


const updateanswer = async (req, res) => {
    try {
        const params = req.params.answerId;
        let userBody = req.body
        let { answeredBy, text, questionId } = userBody
        if (!isValidRequestBody(userBody)) {
            return res.status(400).send({ status: false, message: "Please provide data for successful registration" });
        }
        let checkid = ObjectId.isValid(answeredBy);
        if (!checkid) {
            return res.status(400).send({ status: false, message: "Please provide a valid userId " })
        }
        let checkque = ObjectId.isValid(questionId);
        if (!checkque) {
            return res.status(400).send({ status: false, message: "Please provide a valid questionId " })
        }

        if (req.userId != answeredBy) {
            return res.status(400).send({ status: false, message: "Sorry you are not authorized to do this action" })
        }
        if (!isValid(answeredBy)) {
            return res.status(400).send({ status: false, message: "Please provide answeredBy field" });
        }
        if (!isValid(questionId)) {
            return res.status(400).send({ status: false, message: "Please provide questionId field" });
        }
        if (!isValid(text)) {
            return res.status(400).send({ status: false, message: "Please provide text field" });
        }
        const findanswer = await answerModel.findById({ _id: params })
        if (!findanswer) {
            return res.status(404).send({ status: false, message: `No answer id found ` })

        }

        const upatedanswer = await answerModel.findOneAndUpdate({ answerId: params }, { text: req.body.text }, { new: true })
        res.status(200).send({ status: true, message: 'answer updated successfully', data: upatedanswer });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const deleteanswer = async (req, res) => {
    try {
        const params = req.params.answerId
        let userbody = req.body
        let { userId, questionId } = userbody
        if (!isValidRequestBody(userbody)) {
            return res.status(400).send({ status: false, message: "Please provide data for successful registration" });
        }
        checkId = ObjectId.isValid(params)
        if (!checkId) {
            return res.status(400).send({ status: false, message: "Please provide a valid answerId " })
        }
        let checkuser = ObjectId.isValid(userId);
        if (!checkuser) {
            return res.status(400).send({ status: false, message: "Please provide a valid userId " })
        }
        if (!isValid(userId)) {
            return res.status(400).send({ status: false, message: "Please provide userId field" });
        }
        let checkque = ObjectId.isValid(questionId);
        if (!checkque) {
            return res.status(400).send({ status: false, message: "Please provide a valid questionId " })
        }
        if (!isValid(questionId)) {
            return res.status(400).send({ status: false, message: "Please provide questionId field" });
        }
        const user = await UserModel.findOne({ _id: userId })  //check user exit
        if (!user) {
            res.status(404).send({ status: false, message: `user not found` })
            return
        };
        const tokendetails = req.userId
        if (req.userId != tokendetails) {
            return res.status(400).send({ status: false, message: "Sorry you are not authorized to do this action" })
        }
        const deleteData = await answerModel.findOneAndUpdate({ answerId: params }, { isDeleted: true }, { new: true });
        //return res.status(200).send({ status: true, message: "answer deleted successfullly.", data: deleteData })
        if (deleteData) {
            res.status(200).send({ status: true, msg: "Answer succesfully deleted" })
            return
        }
        return res.status(404).send({ status: false, message: 'Answer already deleted' })
    } catch (err) {
        return res.status(500).send({ status: false, message: "Something went wrong", Error: err.message })
    }

}


module.exports = { createAnswer, getdetails, updateanswer, deleteanswer }