import {promises as fs} from "fs";

export class ProductManager {
    static path = "./data/products.json"
    static lastUid=0;
    
    constructor(){
        this.products = [];
    }

    async addProduct(product){
        const products = JSON.parse(await fs.readFile(ProductManager.path,"utf8"));
        
        //validar code unico
        if(products.some(item =>item.code === code)){
            console.error("El dato de code debe ser unico");
            return false;
        } else
        //Agregar ID al objeto product
            product.id = ++ProductManager.lastUid;
            products.push(product);
        //agregar producto a array de productos
        await fs.writeFile(ProductManager.path,JSON.stringify(products,null,2));
        return true;
    }   

    async getProducts(limit){
        const products = JSON.parse(await fs.readFile(ProductManager.path, "utf8"));
        if(isNaN(limit)){
            return products;
        }else {
            return products.slice(0,limit);
        }
    }

    async getProductById(id){
        const products = JSON.parse(await fs.readFile(ProductManager.path, "utf8"));
        //Busca el producto con el id enviado
        const getProduct = products.find(item => item.id === parseInt(id));
        // valida si el producto exista, si lo encuentra lo muestra
        if(!getProduct){
            return false;
        }else{
           return getProduct;
        }
    }

    async deleteProduct(id) {
        const products = JSON.parse(await fs.readFile.apply(ProductManager.path, "utf8"));
        const isID = products.findIndex((product) => product.id === parseInt(id));
        if (isID != -1) {
            const modProducts = products.filter((prod) => prod.id !== parseInt(id));
            console.log(modProducts);
            return true;
        } else {
            return false
        }
    }
}