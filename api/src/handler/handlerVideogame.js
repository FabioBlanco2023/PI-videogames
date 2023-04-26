const { getVideoGames, getVideogamesByName, getVideogameById, createVideoGame } = require('../controllers/controllerViedeogames');

const getVideogamesHandler = async (req, res) => {
  const { name } = req.query;

  if (name) {
    const games = await getVideogamesByName(name);
    games.length
      ? res.status(200).json(games)
      : res.status(404).json({ msg: "Game not found" });
  } else {
    const games = await getVideoGames();
    res.status(200).json(games);
  }
};

const videogameByIdHandler = async (req, res) => {
  await getVideogameById(req, res);
};

const createVideoGameHandler = async (req, res) => {
  try {
    const newVideoGame = await createVideoGame(req.body);
    res.status(201).json(newVideoGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { getVideogamesHandler, videogameByIdHandler, createVideoGameHandler };