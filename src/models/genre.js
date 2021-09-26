const Sequelize = require('sequelize');

class Genre extends Sequelize.Model {
  static init(sequelize) {
    super.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: Sequelize.STRING,
    }, {
        sequelize
    })
  }
};

module.exports = Genre