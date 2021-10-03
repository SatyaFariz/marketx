const cloudinary = require('../lib/cloudinary')

const { uploader } = cloudinary.v2

const bulkUpload = async (files) => {
  return Promise.all(files.map(file => uploader.upload(file.path)))
  .then(values => {
    return values.map(val => ({
      _id: val.public_id,
      url: val.secure_url,
      height: val.height,
      width: val.width,
      format: val.format,
      bytes: val.bytes
    }))
  })
}

const singleUpload = async (file) => {
  const uploaded = await uploader.upload(file.path)
  return {
    _id: uploaded.public_id,
    url: uploaded.secure_url,
    height: uploaded.height,
    width: uploaded.width,
    format: uploaded.format,
    bytes: uploaded.bytes
  }
}

module.exports = {
  bulkUpload,
  singleUpload
}