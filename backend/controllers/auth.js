// install: npm install --save bcrypt (this encrypts user passwords so we can't see it and no one can hack it)
const bcrypt = require("bcryptjs");
// instal: npm install --save jsonwebtoken
const jwt = require("jsonwebtoken");
// user model
const User = require("../models/user");

exports.createUser = (req, res, next) => {
  //we call bycrypt to hash(create and encryption) for password and 10 is the strength of the encryption.
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        //note: we pass in hash instead of req.body.password as it is now encyrpted
        password: hash
      });
      user.save().then(result => {
        res.status(201).json({
          message: 'User created!',
          result: result
        });
      }).catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
    });
  }

  exports.userLogin = (req, res, next) => {
    // we need to feed the user variable to the next .then() block.
    let fetchedUser;
    // we now check if we can find the user via email in the db.
    User.findOne({email: req.body.email }).then(user => {
    // if we cannot find the user
      if(!user) {
        return res.status(401).json({
          message: "Auth Failed!"
        });
      }
      //pass through the user so it can be fetched below
      fetchedUser = user;
      // now we call bcrypt to compare the password with the input
      return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth Failed!"
        });
      }
      //we use jwt.sign() to create a new json webtoken and it uses the inputs in the front end
        const token = jwt.sign(
        // First: pass the inputs through as jwt elements - *note* password is not passed due to security reasons
          {email: fetchedUser.email, userId: fetchedUser._id},
        // here is were we should generally pass in a random string which is long for encryption of the data passed.
          // this is now stored in the nodemon.json file (global declaration) "secret_this_is_used_for_json_random_string_for_encryption"
          process.env.JWT_KEY,
        // how long the jwt lasts for - here session expires in 1 hour
          { expiresIn: "1h" }
        );
        // now we return our token
        res.status(200).json({
        token: token,
        // we pass in the expires time in seconds for easy conversion in the frontend
        expiresIn: 3600,
        // return the user id
        userId: fetchedUser._id
      });
    }).catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
  }
