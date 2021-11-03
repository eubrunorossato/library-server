const {Sequelize, Model } = require('sequelize');

class Requests extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        book_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pick_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        return_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        pick_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'requests',
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    this.belongsTo(models.Book, {
      foreignKey: 'book_id',
    });
  }
};

module.exports = Requests