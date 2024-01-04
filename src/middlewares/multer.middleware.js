import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/temp') // Our images will be at /public/temp
    },
    filename: function (req, file, cb) {
            cb(null, file.originalname )
    }
  })
  
  export const upload = multer({ storage, })