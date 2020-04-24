const bcrypt = require('bcrypt');

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;

    let [existingUser] = await db.check_user([email]);

    if (existingUser) {
      return res.status(409).send("Email already exists.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let [newUser] = await db.register([email, hash]);

    delete newUser.hash;
    req.session.user = newUser;
    res.status(201).send(req.session.user);
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;

    let [existingUser] = await db.check_user([email]);

    if (!existingUser) {
      return res.status(401).send("Email does not exist.");
    }

    const authenticated = bcrypt.compareSync(password, existingUser.hash);

    if (authenticated) {
      delete existingUser.hash;
      req.session.user = existingUser;
      return res.status(200).send(req.session.user);
    } else {
      return res.status(401).send("Incorrect password.");
    }
  },
  logout: async (req, res) => {
    if (req.session && req.session.user) {
      req.session.destroy();
      return res.status(200).send('User successfully logged out.')
    }

    res.status(404).send('No user currently logged in.');
  },
  getUserSession: async (req, res) => {
    if (req.session && req.session.user) {
      return res.status(200).send(req.session.user);
    }

    res.status(404).send('No user currently logged in.');
  },
};
