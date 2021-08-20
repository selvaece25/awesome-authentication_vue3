const AuthValidator = require("../validators/auth");

const dummyProfiles = [
  {
    user: { username: "email@email.test" },
    profiles: [
      { id: 1, name: "Herr Max Mustermann" },
      { id: 2, name: "Frau Mina Musterfrau" },
    ],
  },
  { user: { username: "ermal@test.de" }, profiles: [{ id: 3, name: "Ermal" }] },
  { user: { username: "noprofile@test.com" }, profiles: [] },
  {
    user: { username: "selva@test.com" },
    profiles: [
      { id: 4, name: "SK" },
      { id: 5, name: "Selvam" },
      { id: 6, name: "Selva Kumar" },
      { id: 7, name: "Selvaece25" },
    ],
  },
];

const generate_token = (length) => {
  var a =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  
return b.join("");
};

const login = async (req, res, next) => {
  const { data } = req.body;
  const validator = new AuthValidator("login");
  try {
    if (validator.validate(data || {}) && validator.value) {
      const { email, password } = validator.value;
      const getUserDetails = dummyProfiles.find(
        (profile) => profile.user.username === email
      );
      if (getUserDetails) {
        res.status(200);
        res.json({
          ...getUserDetails,
          success: true,
          token: generate_token(40),
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

module.exports = { login };
