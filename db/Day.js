const conn = require('./_db');
const Day = conn.define('day', {
  name: conn.Sequelize.STRING
})

module.exports = Day;
