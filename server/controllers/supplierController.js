module.exports = {
  createSupplier: async (req, res) => {
    const db = req.app.get('db');
    const { supplierName, address } = req.body;

    const [ newSupplier ] = await db.create_supplier([ supplierName, address ]);

    res.status(200).send(newSupplier);
  },
  getSuppliers: async (req, res) => {
    const db = req.app.get('db');
    
    const suppliers = await db.get_suppliers();

    res.status(200).send(suppliers);
  },
  updateSupplier: async (req, res) => {
    const db = req.app.get('db');
    const { supplierId } = req.params;
    const { supplierName, address } = req.body;

    const updatedSupplier = await db.update_supplier([ supplierId, supplierName, address ])

    res.status(200).send(updatedSupplier);
  },
  deleteSupplier: async (req, res) => {
    const db = req.app.get('db');
    const { supplierId } = req.params;

    db.delete_supplier([supplierId]);

    res.sendStatus(200);
  },
}