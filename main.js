import express from "express";
import routerProd from "./src/routes/products.route.js"
import routerCarts from "./src/routes/carts.routes.js"

const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use("/api/products", routerProd);
app.use("/api/carts", routerCarts)

//Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
})
