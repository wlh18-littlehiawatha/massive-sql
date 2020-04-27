module.exports = {
  createProduct: async (req, res) => {
    const db = req.app.get('db');
    const { productName, price } = req.body;

    const newProduct = await db.create_product([ productName, price ]);

    if(newProduct) {
      return res.status(200).send(newProduct);
    } else {
      return res.status(500).send('Something went wrong!')
    }
  },
  getProducts: async (req, res) => {
    const db = req.app.get('db');

    const products = await db.get_products();

    res.status(200).send(products);
  },
  updateProduct: (req, res) => {
    const db = req.app.get('db');
    const { productId } = req.params;
    const { productName, price } = req.body;

    db.update_product([ productId, productName, price ])
    .then( updatedProduct => {
      if (updatedProduct.length) {
        return res.status(200).send(updatedProduct);
      } else {
        res.status(500).send('Failed to update');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Something went wrong.');
    })
  },
  deleteProduct: async (req, res) => {
    const db = req.app.get('db');
    const { productId } = req.params;

    const deletedProduct = await db.delete_product([ productId ]);

    if(deletedProduct) {
      res.status(200).send('Product deleted')
    }
  },
}