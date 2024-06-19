const jwt = require('jsonwebtoken');
const User = require('../models/registerSchema')
const multer = require('multer');
const path = require('path')

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token);
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode.userData
        console.log("decode", decode.userData)
        next();
    }
    catch (error) {
        res.status(400).json({
            msg: "Error Pass Token", error
        })
    }
}

const findRole = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const getRole = await User.findById(decode.userData);
        console.log("role", getRole.role);
        if (getRole.role === 'Author') {
            next();
        }
        else {
            res.status(404).json({
                msg: "Role Not Found"
            })
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "Error Find Role", error
        })
    }
}

const checkLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log("tokenee", token);
        if (token) {
            const decode = jwt.verify(token, "secret-key")
            console.log("decode.userData", decode);
            const id = decode.userData
            console.log("id", id);
            const user = await User.findById(id);
            console.log("user", user);
            console.log("role", user.role);
            if (user) {
                if (user.role == 'Author') {
                    next();
                }
                else {
                    res.status(404).json({
                        msg: "Role Not Found"
                    })
                }
            }
            else {
                res.status(404).json({
                    msg: "User Not Found"
                })
            }
        }
        else {
            res.status(404).json({
                msg: "Login Required or Token Not Found"
            })
        }
    }
    catch {
        res.status(404).json({
            msg: "Error Book Created"
        })
    }
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const uploadFile = multer({
    storage: storage
})

module.exports = { auth, findRole, checkLogin, uploadFile }; 