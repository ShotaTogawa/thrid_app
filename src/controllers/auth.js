const models = require('../../models');
const User = models.User;
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const isExistUser = await User.findOne({
      where: {
        email
      }
    });

    if (isExistUser) {
      return res.send('This email has already been taken');
    }

    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10)
    });

    if (!user) {
      return res.send('Failed to sign up');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
      expiresIn: '1h'
    });

    res.status(201).send({ userId: user.id, accessToken: token });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      return res.send('User Not Found.');
    }

    const isValidPasswords = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isValidPasswords) {
      return res.send('Invalid Password');
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ userId: user.id, accessToken: token });
  } catch (err) {
    res.status(500).send('Error ' + err);
  }
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Token not found');

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return res.status(403).send(err);
    req.user = user;
    next();
  });
};
