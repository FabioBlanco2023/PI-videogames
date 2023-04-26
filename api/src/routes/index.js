//const { Router } = require('express');
const express = require('express');

const routergames  = require('./videogames')
const routergenres = require('./genres')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();

router.use("/videogames", routergames);
router.use("/genres", routergenres);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
