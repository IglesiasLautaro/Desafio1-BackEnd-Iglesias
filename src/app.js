// Importamos express
import express from "express";

// Importamos fs
import fs from "fs";

// Declaramos el puerto 8080
const port = 8080;

// Inicializamos express
const app = express();

app.use(express.urlencoded({extended:true}));

// Defino el endpoint /products que lee el archivo de productos y devuelve los productos dentro de un objeto
app.get("/products", (req, res) => {
    try{
    
    const datos = fs.readFileSync("../products.json", "utf-8");
    res.send(JSON.parse(datos));
    
    } catch(err) {
        res.status(500).send("Error al leer el archivo")
    }
});


// Este es el endpoint que deberia traer productos por query params que en este caso lo solicitado es con un limite de productos
app.get("", (req, res) => {
   fs.readFile("../products.json", "utf-8", (err,data) => {
    if(err){
        res.status(500).send("Error al leer el archivo de productos");
        return;
    }
    const productos = JSON.parse(data);
    const cantidadDeProductos = req.query.stock;
    
    if(cantidadDeProductos){
        const productosFiltrados = productos.filter(product => product.stock === cantidadDeProductos);

        res.json(productosFiltrados);
    } else {
        res.json(productos);
    }
   })
})



// Este es el endpoint que deberia traer productos por su ID
app.get("/products/:pid", (req, res) => {
    const pid = parseInt(req.params.pid, 10);
    fs.readFile("../products.json", "utf-8", (err,data) => {
        if(err){
        res.status(500).send("Error al leer el archivo de productos por ID")
        return;
        }
        const productosPorId = JSON.parse(data);
        const productos = productosPorId.find(product => product.id === pid);
        if(productos){
            res.json(productos);
        } else {
            res.status(404).send("Producto no encontrado")
        }
    } )
})


app.listen(port, () => {
    console.log(`El servidor esta escuchando por el puerto ${port}`)
})