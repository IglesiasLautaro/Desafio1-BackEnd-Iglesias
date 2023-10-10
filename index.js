// Creamos la clase ProductManager que contiene un array vacio (simulando la lista de productos llamada products) y un id declarado en 0 para que
//incremente segun el id y el producto que se cargue. Ademas definimos los metodos addProduct(añadir un producto y validar si esta ya fue añadido),
//getProductsById que controla por id si el producto fue metido en el array y en el caso que no te devuelve un not found. El getProductsByCode 
//cumple la misma funcion practicamente que el buscador por ID nada mas que en este caso lo hacemos por el code. El productFind y el ValidProduct fue
//usado para validar que el producto cumpla con todos los requisitos del producto en si y el metodo final que es el getProducts lo usamos para devolver
//el array con todos los productos cargados.

class ProductManager {
    constructor () {
        this.id = 0;
        this.products = [];
    }

    addProduct(product){
        if(!this.productFind(product.code) && product.ValidProduct()){
            this.id = this.id + 1;
            this.products.push(product);
        } else {
            console.log(`El producto ${product.title} ya fue ingresado a la lista de productos.`)
        }
    }
    
    getProductById(id){
        return this.products[id] || `Not Found`
    }

    getProductsByCode(code) {
        return this.products.find((element) => element.code == code);
    } 

    productFind(code){
        return this.getProductsByCode(code) != undefined;
    }
    getProducts(){
        return this.products;
    }
}

// Aqui instanciamos la class ProductManager
const ManagerProduct = new ProductManager();

// La class Product es utilizada para simular unos productos y poder probar que funciona la clase y los metodos de ProductManager, ademas de definir
//los campos que debe de tener cada producto y poder luego realizar la validacion de los mismos.

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    ValidProduct(){
        return(
            this.title &&
            this.description &&
            this.price &&
            this.thumbnail &&
            this.code &&
            this.stock 
        )
    }
}



// Aqui instanciamos los productos que van a ser usados como simulacion para probar la class anterior
const producto1 = new Product('Celular Samsung', 'Celular Alta gama', '2000', 'samsung.img', 'code1', 8);
const producto2 = new Product('Celular Xiaomi', 'Celular Alta gama', '2500', 'xiaomi.img', 'code2', 10);
const producto3 = new Product('Celular Apple', 'Celular Alta gama', '3000', 'iphone.img', 'code3', 10);

// Probamos meter productos en el array products 
ManagerProduct.addProduct(producto1);
ManagerProduct.addProduct(producto2);
ManagerProduct.addProduct(producto3);

// En este console.log recibimos los productos que fueron metidos anteriormente en el array y los recibimos mediante el metodo getProducts
console.log(ManagerProduct.getProducts());

//En este console.log recibimos los productos mediante un filtrado por el ID de los mismos.
console.log(ManagerProduct.getProductById(3));