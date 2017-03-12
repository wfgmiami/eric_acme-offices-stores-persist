const conn = require('./_db');

const Office = conn.define('office', {
  name: {
    type: conn.Sequelize.STRING
  }
})

module.exports = Office;
