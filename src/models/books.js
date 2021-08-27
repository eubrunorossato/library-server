const Sequelize = require('sequelize');

class Books extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      author: Sequelize.STRING,
      realeased_date: Sequelize.DATE,
      gender: Sequelize.STRING,
      resume: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      book_picture: {
        type: Sequelize.BLOB('long'),
        allowNull: false
      },
      avaliables: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    }, {
      sequelize
    })
  }
};

module.exports = Books