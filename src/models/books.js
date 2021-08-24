const Sequelize = require('sequelize');

class Books extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      author: Sequelize.STRING,
      realeased_date: Sequelize.DATE,
      gender: Sequelize.STRING,
      book_picture: Sequelize.BLOB('long'),
      isAvaliable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      isAvaliable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    }, {
      sequelize
    })
  }
};

module.exports = Books