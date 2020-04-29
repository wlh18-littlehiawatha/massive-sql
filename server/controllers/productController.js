module.exports = {
  createProduct: async (req, res) => {
    const db = req.app.get('db');
    const {productName, price} = req.body;

    const newProduct = await db.create_product([productName, price]);


    if(newProduct) {
      res.status(200).send(newProduct);
    } else {
      return res.status(500).send(`Something went wrong!`)
    }

  },



  getProducts: async (req, res) => {
    const db = req.app.get('db');
  },



  updateProduct: async (req, res) => {
    const db = req.app.get('db');
  },




  deleteProduct: async (req, res) => {
    const db = req.app.get('db');
  },
}