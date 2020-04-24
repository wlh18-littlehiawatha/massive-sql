require("dotenv").config();

const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
const authCtrl = require("./controllers/authController");
const userCtrl = require("./controllers/userController");
const productCtrl = require("./controllers/productController");
const supplierCtrl = require("./controllers/supplierController");
const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// * IMPORTANT NOTE: You might be feeling like this index.js file is becoming a little intense and has a lot in it. Express has a way to modularize your servers even more when they start to become large and unruly. Express has a method (express.Router()) that can help with this. Visit https://expressjs.com/en/4x/api.html#express.router to read the docs about how to do this, or you can reach out to me if you'd like more explanation than the docs give.

// Auth Endpoints
app.post("/api/auth/register", authCtrl.register);
app.post("/api/auth/login", authCtrl.login);
app.delete("/api/auth/logout", authCtrl.logout);
app.get("/api/auth/user", authCtrl.getUserSession);

// User Endpoints
app.get("/api/users", userCtrl.getUsers);
app.get("/api/users/:userId", userCtrl.getUser);
app.put("/api/users/:userId", userCtrl.updateUser);
app.delete("/api/users/:userId", userCtrl.deleteUser);
// app.get('/api/users/:userid/orders', userCtrl.getUserOrders);

// ! I haven't finished this yet, I will get that done and push it up to GitHub, but not really needed for our purposes today.
// Orders Endpoints
// app.post('/api/orders');
// app.get('/api/orders');
// app.put('/api/orders');
// app.delete('/api/orders');

// Products Endpoints
app.post("/api/products", productCtrl.createProduct);
app.get("/api/products", productCtrl.getProducts);
app.put("/api/products/:productId", productCtrl.updateProduct);
app.delete("/api/products/:productId", productCtrl.deleteProduct);

// Suppliers Endpoints
app.post("/api/suppliers", supplierCtrl.createSupplier);
app.get("/api/suppliers", supplierCtrl.getSuppliers);
app.put("/api/suppliers/:supplierId", supplierCtrl.updateSupplier);
app.delete("/api/suppliers/:supplierId", supplierCtrl.deleteSupplier);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((db) => {
    app.set("db", db);
    app.listen(SERVER_PORT, () =>
      console.log(`Server running on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(`!!! Failure to connect db`, err));
