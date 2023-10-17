// Creamos la clase ProductManager que contiene un array vacio (simulando la lista de productos llamada products) y un id declarado en 0 para que
//incremente segun el id y el producto que se cargue. Ademas definimos los metodos addProduct(añadir un producto y validar si esta ya fue añadido),
//getProductsById que controla por id si el producto fue metido en el array y en el caso que no te devuelve un not found. El getProductsByCode 
//cumple la misma funcion practicamente que el buscador por ID nada mas que en este caso lo hacemos por el code. El productFind y el ValidProduct fue
//usado para validar que el producto cumpla con todos los requisitos del producto en si y el metodo final que es el getProducts lo usamos para devolver
//el array con todos los productos cargados.
const fs = require("fs");
const { json } = require("stream/consumers");

class ProductManager {
    constructor () {
        this.id = 0;
        this.products = [];
        this.path = "products.json"
    }


    //El metodo addProduct lo que hace es validar el producto y añadir ese mismo producto al array products con un id incremental, en caso de querer ingresar un producto que ya esta almacenado
    //En un array devuelve un console.log que dice que el mismo ya esta en la lista de productos. 
    addProduct(product){
        if(!this.productFind(product.code) && product.ValidProduct()){
            this.id = this.id + 1;
            this.products.push(product);
            fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
        } else {
            console.log(`El producto ${product.title} ya fue ingresado a la lista de productos.`)
        }
    }

    getProductsFromFiles(){
        if(this.products.length < 1){
        fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
            const data = fs.readFileSync(this.path,'utf-8');
            return console.log(`Data esta vacio:${JSON.parse(data)}`);
        } else {
            try{
                
                const data = fs.readFileSync(this.path,'utf-8');
                const array = JSON.parse(data);
                console.log("Estos items ya estan cargados en el sistema")
                
            for( let i=0; i< array.length;i++){
                    
                const currentProduct = array[i]
                console.log(`Item ${i+1}`)
                for(const key in currentProduct){
                console.log(`${key}: ${currentProduct[key]}`)
                    }
                }
                return array;
            }catch(error){
                return 'No puedo ver el archivo'
            }}
        
    }

    updateProductById(id,new_product){
        
        const data =fs.readFileSync(this.path,'utf-8');
        const prods =JSON.parse(data);
        const index =prods.findIndex(x =>{return x.code ===id});

        if(index<0){
            return console.log(`\nNo se ha podido actualizar el id: ${id} \nItem no encontrado\n`)
        }else{
        const product =prods[index];
        
        for(const new_key in new_product){
            if(product[new_key] !== undefined){
                product[new_key]= new_product[new_key] ;
            }
            else{
                console.log(`\nLa key : {${new_key}} no es parte de la direccion por esto no es posible actualizar.`)
            }
        }
        this.products[index]=product;
        fs.writeFileSync(this.path,JSON.stringify(this.products),'utf-8');
        
        }  
    }

    deleteProductById(id){
        const data =fs.readFileSync(this.path,'utf-8');
        const prods =JSON.parse(data);
        const index =prods.findIndex(x =>{return x.code ===id});

        if(index<0){
            return console.log(`\nEl item con el id: ${id} no fue encontrado y no puede borrarse\n`);
        }else{
            console.log("Advertencia sobre eliminar un elemento ya que esto no se puede deshacer");
            this.products.splice(index,1);
            
            fs.writeFileSync(this.path,JSON.stringify(this.products),'utf-8');
          
            console.log(". . . . * BORRADO");
            }
        }


    //El metodo getProductById como su propio nombre lo indica te permite recibir el producto que ingreses segun el ID correspondiente al mismo.
    getProductById(id){
        const data = fs.readFileSync(this.path,'utf-8');
        const prods = JSON.parse(data);
        const product_index = prods.findIndex(x =>{ return x.code === id });
      
        if(!product_index){
            return console.log(`\nEl item con el id: ${id} no fue encontrado`);
        }else{
            console.log(`\nEl item con el id: ${id}`);
            console.log(prods[product_index]);
            
        }
    }
    //El metodo getProductsByCode es muy similar al anterior nada mas que posse la particularidad que los busca segun el code del producto
    getProductsByCode(code) {
        return this.products.find((element) => element.code == code);
    } 

    //ProductFind es para validar junto con ValidProduct que se cumplan todos los requisitos del producto
    productFind(code){
        return this.getProductsByCode(code) != undefined;
    }
    //El metodo getProducts sirve para recibir el producto que indiques, aunque en este caso los productos fueron hardcodeados.
    // getProducts(){
    //     return this.products;
    // }
}

// Aqui instanciamos la class ProductManager
const productManager = new ProductManager();
console.log("--------------Devuelve la lista vacia-------------")
productManager.getProductsFromFiles();

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
const producto4 = new Product("Celular BlackBerry", "Celular Baja Gama", "1000", "blackberry.img", "code4", 4);

console.log("--------------------ITEM LIST------------------")
productManager.getProductsFromFiles();


console.log("---------------ITEM POR ID----------------")
productManager.getProductById(3);


// Probamos meter productos en el array products 
productManager.addProduct(producto1);
productManager.addProduct(producto2);
productManager.addProduct(producto3);

const item_update ={
    "title": "Item de prueba",
    "description": "item de prueba",
    "price": "242424",
    "thumbnail": "prueba.img",
    "code": "code45",
    "stock": "1"
}

console.log("--------------ACTUALIZACION DE ITEM-----------------")
productManager.updateProductById(2,item_update)
productManager.updateProductById(4,item_update)
productManager.getProductsFromFiles();
// const producto4 ={
//     "title":"Celular Blackberry", 
//     "description":"Celular Baja Gama",
//     "value": 1000,
//     "thumbnail": "blackberry.img", 
//     "code": "code4",
//     "stock": 4
// };
console.log("----------------------NUEVO ITEM AÑADIDO---------------------")
productManager.addProduct(producto4);
productManager.getProductsFromFiles();

console.log("--------------------------BORRADO DE ITEM--------------------------")
productManager.deleteProductById(5);
productManager.deleteProductById(3);


productManager.getProductsFromFiles();