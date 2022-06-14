const passport = require('passport');
const LocalStrategy = require('passport-local')
const{User} = require ('../models')
const { Strategy : JwtStrategy, ExtractJwt } = require('passport-jwt' )
const{PlayerUser} = require ('../models')

async function authenticate (username, password, done){
    try {
        const user = await User.authenticate({username,password})
        return done (null, user)
    } catch (error) {
        return done (null, false, {message:error.message})
    }
}

passport.use(new LocalStrategy({usernameField:'username', passwordFIeld:'password',}, authenticate))

passport.serializeUser(
    (user, done) => done (null, user.id)
)

passport.deserializeUser(
    async(id, done)=> done(null, await User.findByPk(id))
)

///JWT
const options = {
    jwtFromRequest : ExtractJwt.fromHeader ('authorization'),
    secretOrKey : 'qwertyasdf',
    }
    passport.use(new JwtStrategy (options, async (payload, done) => {

    PlayerUser.findByPk (payload.id)
    .then(player => done(null, player))
    .catch(err => done(err, false))
    }))

module.exports = passport