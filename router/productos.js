const express = require('express')
const router = express.Router()
const DB = require('../db-controller.js')
let conn = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 8889,
    user : 'root',
    password : 'root',
    database: 'productos'
  }
}
const productos = new DB(conn,"prod")


// Rutas utilizados para estr proyecto
router.get("/productos", (req, res) => {
  console.log(Object.keys(req.io.engine.clients))
  req.io.emit('mensaje', { my: 'estan en formulario de productos' })
  return res.send({ success: true });

})


router.post("/", async (req, res) => {
  try {
    let newProducto = req.body
    await productos.save(newProducto)
    const prods = await productos.getAll()
    req.io.emit('productos', prods)
    return res.send({ success: true });
  } catch (error) {
      res.status(400).send(error)
  }
  
 
})

//Rutas no utilizadas
router.get("/:id", (req, res) => {
    const id = req.params.id
    if (productos.length <= 0) {
      return res.send({
        error: "No hay productos"
      })
    }
    const existe = productos.map(p => p.id).indexOf(parseInt(id))
    if (existe == -1) {
      return res.send("No existe producto con ese id")
    }
  
    res.send(productos[existe])
  
  })
router.put("/:id", (req, res) => {
    const id = req.params.id
    const producto = req.body
    if (productos.length <= 0) {
      return res.send({
        error: "No hay productos"
      })
    }
    const existe = productos.map(p => p.id).indexOf(parseInt(id))
    if (existe == -1) {
      return res.send({
        error: "producto no encontrado"
      })
    }
    Object.assign(productos[existe], producto);
    res.send("Producto actualizado correctamente")
  
  })
router.delete("/:id", (req, res) => {
  const id = req.params.id
  if (productos.length <= 0) {
    return res.send({
      error: "No hay productos"
    })
  }
  const existe = productos.map(p => p.id).indexOf(parseInt(id))
  if (existe == -1) {
    return res.send("No existe producto con ese id")
  }
  productos.splice(existe, 1)
  res.send("Producto eliminado correctamente")

})



module.exports = router
