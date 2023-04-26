const { Router } = require('express');
const { handleGetGenres } = require('../handler/handlerGenres');

require("dotenv").config();

const routergenres = Router();

// Obtengo los genres desde la API y los guardo en la DB

routergenres.get('/', handleGetGenres);

module.exports = routergenres;