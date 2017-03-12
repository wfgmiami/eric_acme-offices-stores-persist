const conn = require('./_db');

const Place = conn.define('place', {
  lat: {
    type: conn.Sequelize.DECIMAL,
  },
  lng: {
    type: conn.Sequelize.DECIMAL
  },
  name: {
    type: conn.Sequelize.STRING
  }
})

module.exports = Place;
