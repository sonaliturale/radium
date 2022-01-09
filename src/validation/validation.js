const validator = require("email-validator");
const userModel = require('../models/userModel');

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

const isValidMobileNum = function (value) {
    if (!(/^[6-9]\d{9}$/.test(value))) {
        return false
    }
    return true
}

const isValidSyntaxOfEmail = function (value) {
    if (!(validator.validate(value))) {
        return false
    }
    return true
}


const checkUser = async (req, res, next) => {
    try {
        let userBody = req.body
        if (!isValidRequestBody(userBody)) {
            return res.status(400).send({ status: false, message: "Please provide data for successful registration" });
        }
        let { fname, lname, email, phone, password,creditScore } = userBody;
        if (!isValid(fname)) {
            return res.status(400).send({ status: false, message: "Please provide fname or fname field" });
        }
        if (!isValid(lname)) {
            return res.status(400).send({ status: false, message: "Please provide lname or lname field" });
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please provide Email id or email field" });;
        }
        if (!isValidSyntaxOfEmail(email)) {
            return res.status(404).send({ status: false, message: "Please provide a valid Email Id" });
        }
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: "Please provide phone number or phone field" });
        }
        if (!isValidMobileNum(phone)) {
            return res.status(400).send({ status: false, message: ' Please provide a valid phone number' })
        }
        if (!isValid(creditScore )) {
            return res.status(400).send({ status: false, message: 'Please provide creditScore ' })
        }
        
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please provide password or password field" });;
        }
        let size = Object.keys(password.trim()).length
        if (size < 8 || size > 15) {
            return res.status(400).send({ status: false, message: "Please provide password with minimum 8 and maximum 14 characters" });;
        }
        const isphoneAlreadyUsed = await userModel.findOne({ phone });

        if (isphoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${phone} phone is already registered` })
        }

        const isEmailAlreadyUsed = await userModel.findOne({ email }); 

        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} email address is already registered` })
        }
        
        next();
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}




const checkUpdateUser = async (req, res, next) => {
    try {
        let userBody = req.body
        if (!isValidRequestBody(userBody)) {
            return res.status(400).send({ status: false, message: "Please provide data for successful registration" });
        }
        let { fname, lname, email, phone, password } = userBody;
        if (!isValid(fname)) {
            return res.status(400).send({ status: false, message: "Please provide fname or fname field" });
        }

        if (!isValid(lname)) {
            return res.status(400).send({ status: false, message: "Please provide lname or lname field" });
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please provide Email id or email field" });;
        }
        if (!isValidSyntaxOfEmail(email)) {
            return res.status(404).send({ status: false, message: "Please provide a valid Email Id" });
        }
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: "Please provide phone number or phone field" });
        }
        if (!isValidMobileNum(phone)) {
            return res.status(400).send({ status: false, message: '1 Please provide a valid phone number' })
        }
        
        const isphoneAlreadyUsed = await userModel.findOne({ phone });

        if (isphoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${phone} phone is already registered` })
        }

        const isEmailAlreadyUsed = await userModel.findOne({ email }); 

        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} email address is already registered` })
        }
        
        
        next();
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


// const checkQuestion = async (req, res, next) => {
//     try {
//         let userBody = req.body
//         if (!isValidRequestBody(userBody)) {
//             return res.status(400).send({ status: false, message: "Please provide data for successful registration" });
//         }
        

//         if (!isValid(tag)) {
//             return res.status(400).send({ status: false, message: "Please provide tag" });
//         }
//         if (!isValid()) {
//             return res.status(400).send({ status: false, message: "Please provide fname or fname field" });
//         }



module.exports ={ checkUser ,isValidRequestBody,checkUpdateUser}





