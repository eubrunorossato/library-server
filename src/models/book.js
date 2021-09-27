const {Sequelize, Model } = require('sequelize');

class Book extends Model {
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
        author_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        genre_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        resume: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        book_picture: {
          type: Sequelize.BLOB,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'books',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Genre, {
      foreignKey: 'genre_id',
    });
    this.belongsTo(models.Author, {
      foreignKey: 'author_id',
    });
  }
};

module.exports = Book