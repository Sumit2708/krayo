const mongoose = require('mongoose')

const imgSchema = new mongoose.Schema({
    imgPath:{
        type:String,
        required:true
    }
})


const files = new mongoose.model("files",imgSchema)
module.exports = files