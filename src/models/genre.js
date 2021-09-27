const {Sequelize, Model } = require('sequelize');

class Genre extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'genres',
      }
    );
    return this;
  }
};

module.exports = Genre