const {Sequelize, Model } = require('sequelize');

class User extends Model {
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
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {  
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        celphone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isByGoogle: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'users',
      }
    );
    return this;
  }
};

module.exports = User