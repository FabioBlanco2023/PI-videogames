const { Router } = require('express');
const { videogameByIdHandler, getVideogamesHandler, createVideoGameHandler } = require('../handler/handlerVideogame')


const routergames = Router();

routergames.get("/", getVideogamesHandler);
routergames.get("/:idVideogame", videogameByIdHandler);
routergames.post("/", createVideoGameHandler );

module.exports = routergames;