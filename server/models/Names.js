const mongoose = require("mongoose")

const NameModel = mongoose.model('NameModel', {}, "battleNames")
module.exports = NameModel