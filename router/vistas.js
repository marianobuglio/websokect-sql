const express = require('express')
const router = express.Router()



// Rutas utilizados para estr proyecto
router.get("/", (req, res) => {
 

  res.render("formulario.hbs")

})

module.exports = router
