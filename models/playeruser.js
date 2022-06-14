'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

// const { password } = require('pg/lib/defaults');

module.exports = (sequelize, DataTypes) => {
  class PlayerUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
        /// encrypt password
    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    /// register
    static registerPlayer = ({username, password}) => {
      const encryptedPasssword = this.#encrypt(password);
      return this.create({username, password: encryptedPasssword});
    }
    /// compare password
    comparePassword = (password) => bcrypt.compareSync(password, this.password);

    /// login
    static loginPlayer = async ({ username, password }) => {
      try {
        const playerUser = await this.findOne({ where: { username } });
        if (!playerUser) return Promise.reject("Username or Password Invalid!!!");
       
        const checkPassword = playerUser.comparePassword(password);

        if (!checkPassword)
          return Promise.reject("Username or Password Invalid!!!");
        return Promise.resolve(playerUser);
      } catch (error) {
        Promise.reject(error);
      }
    }
    
  }
  PlayerUser.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PlayerUser',
  });
  return PlayerUser;
};