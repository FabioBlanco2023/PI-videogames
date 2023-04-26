require('dotenv').config();
const axios = require('axios');
const { Videogames, Genres } = require('../db');
const { Op } = require('sequelize');

const { API_KEY } = process.env;


//solicitud GET a la API de Rawg utilizando la clave de API y devuelve una lista de videojuegos.
const getVideoGames = async () => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const videoGames = response.data.results;
    const dBGames = await Videogames.findAll();
    return [...videoGames, ...dBGames]
  } catch (error) {
    console.error(error);
    return []
  }
};

//objeto de juego de la API de Rawg reformatea 
const formatGameData = (game) => {
  return {
    id: game.id,
    name: game.name,
    releaseDate: game.released,
    rating: game.rating,
    backgroundImage: game.background_image,
    genres: game.genres.map((genre) => genre.name),
    platforms: game.platforms.map((platform) => platform.platform.name),
  };
};

//busca videojuegos en la base de datos que coincidan con el nombre proporcionado en la consulta de búsqueda.
const getVideogamesByName = async (name) => {
  const gamesFromDB = await Videogames.findAll({
    where: {
      nombre: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: Genres,
    limit: 15,
  });

  if (gamesFromDB.length > 0) {
    return gamesFromDB;
  }


  // Si no hay juegos en la base de datos, buscar en la API de Rawg
  const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&page_size=15&key=${API_KEY}`);
  const gamesFromAPI = response.data.results.map((game) => formatGameData(game));
  return gamesFromAPI;
};

// busca un videojuego por su ID. Si se encuentra en la base de datos, se devuelve la información del juego. 
//De lo contrario, se hace una solicitud a la API de Rawg para buscar el juego por su ID. 
const getVideogameById = async (req, res) => {
  try {
    const { idVideogame } = req.params;

    const videoGameDB = await Videogames.findByPk(idVideogame);

    if (videoGameDB) {
      res.json(videoGameDB);
    } else {
      const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);

      const videoGameDetail = {
        ...response.data,
        genres: response.data.genres.map((genre) => genre.name),
      };

      res.json(videoGameDetail);
    }
  } catch (error) {
    console.error(error);
  }
};

// crea un nuevo videojuego en la base de datos utilizando los datos proporcionados en la solicitud. 
const createVideoGame = async (videoGameData) => {
  try {
    const { nombre, imagen, descripción, plataformas, fecha_de_lanzamiento, rating, generos } = videoGameData;

    const videoGame = new Videogames({
      nombre,
      imagen,
      descripción,
      plataformas,
      fecha_de_lanzamiento,
      rating,
      generos,
    });
    await videoGame.save();

    // asocia los generos con los videojuegos
    const genreIds = await Promise.all(
      generos.map(async (genreName) => {
        const genre = await Genres.findOne({ name: genreName });
        if (!genre) throw new Error(`Genre '${genreName}' not found`);
        return genre._id;
      })
    );
    videoGame.genres = genreIds;
    await videoGame.save();

    return videoGame;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = { getVideoGames, getVideogamesByName, getVideogameById, createVideoGame };