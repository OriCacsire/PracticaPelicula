const db = require('../database/models');

const indexController = {
    index: function(req, res) {
      return res.render("index")
    }
}

module.exports = indexController;