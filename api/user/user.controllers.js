const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
require('dotenv').config();

const tokenSecret = process.env.JWT_SECRET;

const tokenExpirey = process.env.JWT_TOKEN_EXP;

// Note that this template uses a very basic authintication and there are no validation please add your adjusments based on your app needs

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, tokenSecret, {
    expiresIn: tokenExpirey,
  });

  return token;
};

exports.register = async (req, res, next) => {
  try {
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      return res
        .status(403)
        .json({ message: 'This email is used by another account' });
    }

    req.body.password = await hashPassword(password);

    const newUser = await User.create({
      email,
      password: req.body.password,
    });

    const token = generateToken(newUser);

    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = generateToken(req.user);

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
