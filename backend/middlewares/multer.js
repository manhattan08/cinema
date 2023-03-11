const multer = require('multer');

const storage = multer.diskStorage({})

const ImageFileFilter = (req,file,cb) => {
    if(!file.mimetype.startsWith('image')){
        cb('Suppotred only image files!',false)
    }
    cb(null,true)
}

const VideoFileFilter= (req,file,cb) => {
    if(!file.mimetype.startsWith('video')){
        cb('Suppotred only image files!',false)
    }
    cb(null,true)
}

exports.uploadImage = multer({storage,ImageFileFilter})
exports.uploadVideo = multer({storage,VideoFileFilter})