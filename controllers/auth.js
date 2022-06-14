const { generateToken } = require("../helper/jwt");
const {User} = require('../models');
const {PlayerUser} = require('../models');
const passport = require('../lib/passport');



async function formRegister (req, res){
    res.render('register');
}

async function register (req, res){
    try {
        let data = await User.register(req.body)
        res.redirect('/auth/login')    
    } catch (error) {
        console.log(error)
    }
}

async function formLogin (req, res){
    res.render('login');
}

async function login (){
    passport.authenticate('local', {
        successRedirect:"/auth/whoami",
        failureRedirect:"/login",
        failureFlash: true,
    });
}

async function whoami (req, res){
    res.render('profile', req.user.dataValues)
}



///JWT

async function registerPlayer (req, res){
    try {
        let player = await PlayerUser.registerPlayer(req.body);
        res.status(201).json({ message: "Register success" });
    } catch (error) {
        console.log(error);
    }
}

async function viewPlayerUser(req, res) {
    try {
      let player = await PlayerUser.findAll({ attributes: ["id", "username"] });
      res.status(200).json({ player });
    } catch (error) {
      console.log(error);
    }
  }

async function loginPlayer(req, res) {
    try {
      let player = await PlayerUser.loginPlayer(req.body);
      let token = generateToken(player);
      res.status(200).json({
        data: {
          id: player.id,
          username: player.username,
          accesToken: token
        },
      });
    } catch (error) {}
  }  

async function profilPlayer(req, res) {
    const currentUser = req.user;
    res.json(currentUser)     
}

module.exports = { formRegister, register, formLogin, login, whoami, registerPlayer, viewPlayerUser, loginPlayer, profilPlayer};