require('dotenv').config();
const axios = require('axios');
const { Genres } = require('../db');

const { API_KEY } = process.env;

//obtiene los géneros de videojuegos desde una base de datos local y 
//si no hay géneros almacenados en la base de datos, los obtiene de una API externa
const getGenres = async () => {
  try {
    const genresInDB = await Genres.findAll();
    if (genresInDB.length > 0) {
      return genresInDB;
    } else {
      const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      const genres = response.data.results.map(({ id, name }) => ({ id, name }));
      await Genres.bulkCreate(genres);
      const genresFromDB = await Genres.findAll();
      return genresFromDB;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getGenres };