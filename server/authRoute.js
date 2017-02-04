const app = require('APP'), {env} = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const User = require('APP/db/models/user')
const Drawing = require('APP/db/models/drawing')
const Version = require('APP/db/models/version')
const auth = require('express').Router()

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const secrets = require('APP/secrets')



// Other passport configuration:

passport.serializeUser((user, done) => {
  debug('will serialize user.id=%d', user.id)
  done(null, user.id)
  debug('did serialize user.id=%d', user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        if(user){
          debug('deserialize did ok user.id=%d', user.id)
        }
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

// sign in with google:

auth.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

passport.use(
  new GoogleStrategy({
    clientID: secrets.GOOGLE_CONSUMER_KEY,
    clientSecret: secrets.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/google`
  },
  function(token, refreshToken, profile, done){
    var info = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value
    };
    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
    })
    .spread(function(user){
      done(null, user)
    })
    .catch(done)
  })
)

// handle the callback after Google has authenticated the user
auth.get('/login/google',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login' 
  })
);


passport.use(new (require('passport-local').Strategy) (
  (email, password, done) => {
    debug('will authenticate user(email: "%s")', email)
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          debug('authenticate user(email: "%s") did fail: no such user', email)
          return done(null, false, { message: 'Login incorrect' })
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              debug('authenticate user(email: "%s") did fail: bad password')              
              return done(null, false, { message: 'Login incorrect' })
            }
            debug('authenticate user(email: "%s") did ok: user.id=%d', user.id)
            done(null, user)              
          })
      })
      .catch(done)
  }
))

auth.get('/whoami', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id, {
      include: [{
        model: User,
        as: 'followers',
      },{
        model: User,
        as: 'followees',
      },{
        model: Drawing,
        include: [ Version ]
      }]
    })

    res.json(user)
  }catch(next){
    const err = new Error()
    err.status = 400
    throw err
  }
})

auth.post('/:strategy/login', (req, res, next) =>
  passport.authenticate(req.params.strategy, {
    successRedirect: '/'
  })(req, res, next)
)

auth.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

module.exports = auth

