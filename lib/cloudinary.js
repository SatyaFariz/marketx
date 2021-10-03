const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'tuanrumah',//process.env.CLOUDINARY_NAME, 
  api_key: '922219989176362',//process.env.CLOUDINARY_KEY, 
  api_secret: 'V_SscHXLgFFcZGhiFpotDiCOui4', //process.env.CLOUDINARY_SECRET
})

module.exports = cloudinary