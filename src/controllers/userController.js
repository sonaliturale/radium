const UserModel = require("../models/userModel.js")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const ObjectId = require('mongoose').Types.ObjectId



const createUser = async function (req, res) {
    try {
        let userBody = req.body
        let { fname, lname, email, phone, password,creditScore } = userBody
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const userData = { fname, lname, email, phone, password,creditScore }
        const userDetails = await UserModel.create(userData);
        return res.status(201).send({ status: true, message: "successfully user created", data: userDetails })
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createUser = createUser


const login = async (req, res) => {
    try {
        const Email = req.body.email
        const Password = req.body.password

        let user = await UserModel.findOne({ email: Email });
        if (user) {
            const { _id, password } = user
            const validPassword = await bcrypt.compare(Password, password);
            if (!validPassword) {
                return res.status(400).send({ message: "Invalid Password" })
            }
            let payload = { userId: _id, email: Email };
            const generatedToken = jwt.sign(payload, "Quora");
            res.header('authorization', generatedToken);
            return res.status(200).send({ status: true, data: { userId: user._id, token: generatedToken 
                //iat: Math.floor(Date.now() / 1000),
                //exp: Math.floor(Date.now() / 1000) + 100 * 60 * 60 ,
            } 
            });
           
        } else {
            return res.status(400).send({ status: false, message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports.login = login




//GET /user/:userId/profile 
const getUser = async function (req, res) {
    try {
        let decodedtokenUserId = req.userId
        // console.log(decodedtokenUserId)
        
        const userId = req.params.userId
        if (!(userId)) {
            return res.status(400).send({ status: false, message: 'Please provide valid userId' })
        }
        let checkId = ObjectId.isValid(userId)
         if (!(checkId)) {
            return res.status(400).send({ status: false, message: 'Please provide valid userId in queryparams' })
        }
        const searchprofile = await UserModel.findOne({ _id: userId })


        if (!searchprofile) {
            return res.status(404).send({ status: false, message: 'user  does not exist' })
        }
        if (!decodedtokenUserId === userId) {
            res.status(400).send({ status: false, message: "userId in url param and in token is not same" })
        }

        //const Data = await UserModel.find({ _id: userId })
         res.status(200).send({ status: true, message: 'user profile details', data: searchprofile })

    } catch (error) {

        return res.status(500).send({ success: false, error: error.message });
    }
}


module.exports.getUser = getUser;



const UpdateUser = async (req, res) => {
    try {
        userId = req.params.userId;
        TokenDetail = req.user
        const requestBody = req.body;
         let checkId = ObjectId.isValid(userId)
         if (!(checkId)) {
            return res.status(400).send({ status: false, message: 'Please provide valid userId in queryparams' })
        }


        const UserFound = await UserModel.findOne({ _id: userId })
        if (!UserFound) {
            return res.status(404).send({ status: false, message: `User not found with given UserId` })
        }
        if (!TokenDetail === userId) {
            res.status(400).send({ status: false, message: "userId in url param and in token is not same" })
        }
        var { fname, lname, email, phone} = requestBody
        
        const UpdateData = { fname, lname, email, phone}
        const upatedUser = await UserModel.findOneAndUpdate({ _id: userId }, UpdateData, { new: true })
        res.status(200).send({ status: true, message: 'User profile updated successfully', data: upatedUser });

    } catch (error) {

        return res.status(500).send({ success: false, error: error.message });
    }
}

module.exports.UpdateUser = UpdateUser



