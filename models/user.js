'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

const { password } = require('pg/lib/defaults');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
    static register = ({username, password}) => {
      const encryptedPasssword = this.#encrypt(password);
      return this.create({username, password: encryptedPasssword});
    }
    /// compare password
    comparePassword = (password) => bcrypt.compareSync(password, this.password);

    /// login
    static authenticate = async ({username, password}) => {
      try {
        const user = await this.findOne({where:{username}})
        if (!user) return Promise.reject("user not found!!!");
        const isPasswordValid = user.comparePassword(password)
        if (!isPasswordValid) return Promise.reject("Password Invalid!!")
        return Promise.resolve(user)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  };

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};