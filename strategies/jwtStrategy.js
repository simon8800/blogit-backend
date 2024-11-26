require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userQueries = require("../db/userQueries");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
  const user = await userQueries.findByEmailBasicInfo(jwt_payload.email);

  if (user) {
    // Injects user information into request
    // Access using req.user
    return done(null, user);
  }
  return done(null, false);
});
