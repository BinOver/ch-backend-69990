import express from "express";
import { engine } from "express-handlebars"
import { Server } from "socket.io"
import routerProd from "./routes/products.route.js";
import routerCarts from "./routes/carts.routes.js";
import routerViews from "./routes/views.router.js";
import { ProductManager } from "./controllers/ProductManager.js"

const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public")); 

//Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Routes api
app.use("/api/products", routerProd);
app.use("/api/carts", routerCarts);

//Routes Views
app.use("/",routerViews);

//Server (referencia)
const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
});

//
const productManager = new ProductManager();
// instacia de Socket.io
const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Se conecto un cliente.")
    // Enviamos array de productos
    socket.emit("products", await productManager.getProducts())
    // Recibimos "deletProduct" desde el cliente
    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);
        // Envio lista actualizada al cliente
        io.sockets.emit("products", await productManager.getProducts());
    });
        // Envio lista actualizada al cliente
        io.sockets.emit("products", await productManager.getProducts());
    // Recibimos "addProduct" desde el cliente
    socket.on("addProduct", async (product) => {
        await productManager.addProduct(product);
        console.log(product);
        // Envio lista actualizada al cliente
        io.sockets.emit("products", await productManager.getProducts());
    });
});
