var multer = require("multer");
var express = require('express');
var path = require("path");
var router = express.Router();
var session = require('express-session');

/* GET home page. */
var path = require('path');
const app = require('../app');
const { error } = require("console");
const { file } = require("pdfkit");
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "..", "/public/html/index.html"))
});

// app.use(session({"secret": "prabhav"}))
// multer file storage configuration
let storage = multer.diskStorage({
  //store the images in the ./public/images folder
  destination: function(required, file, cb) {
    cb(null, "public/images");
  },
  // rename the images
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.mimetype.split('/')[1]);
  }
 });

// configure for file filter

let fileFilter = (req, file, callback)=>{
  let ext = path.extname(file.originalname);
  // if the file extension isn't .png or .jpg return an error page else true
  if(ext !== '.png' & ext !== '.jpg') {
    return callback(new error("Only .png and .jpg files are accepted"));
  } else {
    return callback(null, true);
  }
}

// initialize multer with configuration for storage and file filter

var upload = multer({storage, fileFilter: fileFilter});
// create router
router.post('/upload', upload.array('images'), function(req, res) {
  let files = req.files;
  let imagesName = [];
  // extract the file name
  for(i of files) {
    let index = Object.keys(i).findIndex(function(event) {
      return event===file;
    })
    imagesName.push(Object.values(i)[index]);
  }
  // store the image file names in a session
  req.session.imagesfiles = imagesName;
  // redirect a request to route
  res.redirect('/');
})

module.exports = router;
