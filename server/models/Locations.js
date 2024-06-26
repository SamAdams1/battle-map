const mongoose = require("mongoose")

const LocationModel = mongoose.model('LocationModel', {}, "battleLocations")
module.exports = LocationModel