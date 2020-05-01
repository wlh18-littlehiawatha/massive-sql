module.exports = {
  getUsers: async (req, res) => {
    const db = req.app.get('db');
    
    const users = await db.get_users();

    res.status(200).send(users);
  },
  getUser: async (req, res) => {
    const db = req.app.get('db');
    const { userId } = req.params;
    
    const [ user ] = await db.get_user([ userId ]);

    res.status(200).send(user);
  },
  updateUser: async (req, res) => {
    const db = req.app.get('db');
    const { userId } = req.params;
    const { email } = req.body;

    const updatedUser = await db.update_user([ userId, email ])

    res.status(200).send(updatedUser);
  },
  deleteUser: async (req, res) => {
    const db = req.app.get('db');
    const { userId } = req.params;

    db.delete_user([userId]);

    res.sendStatus(200);
  },
  getUserOrders: async (req, res) => {
    const db = req.app.get('db');
    const { userId } = req.params;

    const userOrders = await db.get_orders_by_user_id([userId]);

    res.status(200).send(userOrders);
  }
}