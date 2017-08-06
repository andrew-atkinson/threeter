const Sequelize = require('sequelize')
const db = require('./db')

module.exports = db.define('tweets', {
  name: Sequelize.TEXT,
  user_id: Sequelize.STRING,
  user_screen_name: Sequelize.STRING,
  text: Sequelize.TEXT,
  id_str: Sequelize.STRING,
  place_id:Sequelize.STRING,
  place_name: Sequelize.STRING,
  place_country: Sequelize.STRING,
  place_bounding_box_coordinates:Sequelize.ARRAY(Sequelize.TEXT),
  in_reply_to_status_id_str: Sequelize.STRING,
  in_reply_to_user_id_str: Sequelize.STRING
})

