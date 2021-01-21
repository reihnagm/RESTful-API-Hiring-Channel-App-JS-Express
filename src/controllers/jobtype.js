const JobTypes = require("../models/JobType")
const misc = require("../helpers/helper")

module.exports = {

	all: async (req, res) => {
    const all = await JobTypes.all()
    try {
      misc.response(res, 200, false, null, all)
    } catch (err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error')
    }
  },

}