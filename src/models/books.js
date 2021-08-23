const Sequelize = require('sequelize');

class Books extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      author: Sequelize.STRING,
      realeased_date: Sequelize.DATE,
      gender: Sequelize.STRING,
      isAvaliable: Sequelize.BOOLEAN,
    }, {
      sequelize
    })
  }
};

module.exports = Books