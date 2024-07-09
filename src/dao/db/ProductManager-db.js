import ProductModel from "../models/product.model.js";

class ProductManager {
    async readProducts() {
        try {
            const prodData = await fs.readFile(ProductManager.path);
            this.products = JSON.parse(prodData);
            if (this.products.length > 0) {
                ProductManager.lastPid = Math.max(...this.products.map(product => product.id));
            }
        } catch (error) {
            console.error("Error al cargar los carritos desde el archivo", error)
            await this.saveCarts();
        }
    }

    async addProduct({title,description,price,img,code,stock,category,thumbnails}){
        try {
            //validar code unico
            const existCode = await ProductModel.findOne({code:code});
            if(existCode){
                console.error("El dato de code debe ser unico");
                return false;
            }
            const newProduct = await ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                thumbnails
            })
            await newProduct.save();
            return true;
        } catch (err) {
            console.log("Error al agregar el producto" + err);
            throw err;
        }
    }

    async updateProduct(id, product){
        try {
            const product = await ProductModel.findByIdAndUpdate(id, product);
            if(!product) {
                console.log("No se encuentra el producto.")
                return false;
            }else {
                console.log("Producto actualizado.");
                return product;
            }
        } catch (error) {
            console.log("Error al actualizar el producto");
            throw error;
        }
    }

    async getProducts(limit){
        try {
            const arrayProducts = ProductModel.find();
            if(isNaN(limit)){
                return arrayProducts;
            }else {
                //
            }
        } catch (err) {
            console.log("Error al encontrar productos" + err);
            throw err;
        }
    }

    async getProductById(id){
        try {
            const getProduct = await ProductModel.findById(id);
            // valida si el producto exista, si lo encuentra lo muestra
            if(!getProduct){
                console.log("Producto no encontrado.");
                return false;
            }else{
                console.log("Producto encontrado.");
                return getProduct;
            }
        } catch (err) {
            console.log("error al buscar producto por id." + err);
            throw err;
        }
    }

    async deleteProduct(id) {
        try {
            const delProduct = await ProductModel.findByIdAndDelete(id);
            if(!delProduct) {
                console.log("No se encuentra el producto a borrar.");
                return false;
            }else {
                console.log("Producto eliminado.");
                return delProduct;
            }
        }catch(err) {
            console.log("error al eliminar producto por id." + err);
            throw err;
        }
    }
}

export default ProductManager;