const express = require('express')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + "-" + file.originalname)
    },

})

const fileFilter = (req, file, cb)=> { 
    if(file.mimetype=="image/jpg" || file.mimetype=="image/jpeg" || file.mimetype=="image/png" ||  file.mimetype=='image/bmp'){
        cb(null, true)
    }else{
        return cb(new Error('Only image are allowed!'))
    }
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 512 * 512
    },
    fileFilter: fileFilter,
})

module.exports = upload