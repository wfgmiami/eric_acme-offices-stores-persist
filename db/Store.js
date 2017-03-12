const conn = require('./_db');

const Store = conn.define('store', {
  name: {
    type: conn.Sequelize.STRING
  }
})

module.exports = Store;
