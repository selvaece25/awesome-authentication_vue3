const jwt = require('jsonwebtoken');
const tokenSecret = 'my-token-secret';

const AuthValidator = require('../validators/auth');

const dummyProfiles = [
  {
    user: { username: 'email@email.test' },
    profiles: [
      { id: 1, name: 'Herr Max Mustermann' },
      { id: 2, name: 'Frau Mina Musterfrau' },
    ],
  },
  { user: { username: 'ermal@test.de' }, profiles: [{ id: 3, name: 'Ermal' }] },
  { user: { username: 'noprofile@test.com' }, profiles: [] },
  {
    user: { username: 'selva@test.com' },
    profiles: [
      { id: 4, name: 'SK' },
      { id: 5, name: 'Selvam' },
      { id: 6, name: 'Selva Kumar' },
      { id: 7, name: 'Selvaece25' },
    ],
  },
];

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' });
}

const switchUser = async (req, res, next) => {
  try {
    const { data } = req.body;
    const { email_id, user_id } = data;
    const getUserDetails = dummyProfiles.find((profile) => profile.user.username === email_id);
     const profileDetails =  getUserDetails.profiles ? getUserDetails.profiles.find((profile) => profile.id === user_id) : {};
     if (getUserDetails) {
      const userId = profileDetails && profileDetails.id || null; 
      const user = { email_id: getUserDetails.user.username, id: userId };
      res.status(200);
      res.json({
        ...getUserDetails,
        success: true,
        token: generateToken(user),
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    next();
  }
};

const fetchUser = async (req, res, next) => {
  try {
    const user = req.user || {};
    const getUserDetails = dummyProfiles.find((profile) => profile.user.username === user.email_id);
    const profileDetails =  getUserDetails.profiles ? getUserDetails.profiles.find((profile) => profile.id === user.id) : {};
    if (getUserDetails) {
      const user_name = profileDetails && profileDetails.name  || '-';
      const user_email = getUserDetails.user.username || '-';
      res.status(200);
      res.json({
        user_name,
        user_email,
        success: true,
        token: generateToken(user),
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    next();
  }
};

const login = async (req, res, next) => {
  const { data } = req.body;
  const validator = new AuthValidator('login');
  try {
    if (validator.validate(data || {}) && validator.value) {
      const { email, password } = validator.value;
      const getUserDetails = dummyProfiles.find(
        (profile) => profile.user.username === email,
      );
      if (getUserDetails) {
        const userId =
          getUserDetails.profiles && getUserDetails.profiles[0]
            ? getUserDetails.profiles[0].id
            : null;
        const user = { email_id: getUserDetails.user.username, id: userId };
        res.status(200);
        res.json({
          ...getUserDetails,
          success: true,
          token: generateToken(user),
        });
      } else {
        res.sendStatus(404);
      }
    } else {
      res.status(400);
      res.json(validator.errors);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    next();
  }
};

module.exports = { login, switchUser, fetchUser };
