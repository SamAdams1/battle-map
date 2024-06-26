const mongoose = require("mongoose")

const CountryCenterModel = mongoose.model('CountryCenterModel', {}, "countryCenter")
module.exports = CountryCenterModel