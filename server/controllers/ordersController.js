module.exports = {
  createOrder: async (req, res) => {
    const db = req.app.get("db");
    const { userId, productIds } = req.body;

    const [newOrder] = await db.create_order([userId]);

    let newOrderWithProducts = {
      orderId: newOrder.id,
      productIds: [],
    };

    for (let i = 0; i < productIds.length; i++) {
      const [partOfOrder] = await db.add_product_to_order([
        newOrderWithProducts.orderId,
        productIds[i],
      ]);

      newOrderWithProducts.productIds.push(partOfOrder.product_id);
    }

    res.status(200).send(newOrderWithProducts);
  },
  getOrders: async (req, res) => {
    const db = req.app.get("db");

    const orders = await db.get_orders();

    res.status(200).send(orders);
  },
  deleteOrder: async (req, res) => {
    const db = req.app.get("db");
    const { orderId } = req.params;

    const [deletedOrder] = await db.delete_order([orderId]);

    if (deletedOrder) {
      return res.status(200).send("Order Deleted");
    }

    res.status(500).send("Error while trying to delete order");
  },
};
