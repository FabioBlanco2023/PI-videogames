const { getGenres } = require('../controllers/controllerGenres');

const handleGetGenres = async (req, res) => {
  try {
    console.log('handler try');
    const genres = await getGenres();
    res.json({
      message: 'La ruta de genres funciona correctamente',
      data: genres,
    });
  } catch (error) {
    console.log("handler catch");
    console.error(error);
    res.status(500).json({ message: 'Error retrieving genres' });
  }
};

module.exports = { handleGetGenres };