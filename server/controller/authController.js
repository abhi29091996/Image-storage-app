const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models/UserSchema");

// Configure Passport.js to use the local strategy for authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log(">>>", username, password);
      // Implement your own logic to find and validate the user in your MongoDB collection
      const user = await User.findOne({ email: username });

      // If the user doesn't exist or the password is incorrect, return an error
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      // If the user is valid, return the user object
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Serialize and deserialize user objects
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Implement your own logic to retrieve the user from the database based on the ID
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
