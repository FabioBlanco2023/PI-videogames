const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Videogames", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    descripción: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    plataformas: {
       type: DataTypes.STRING,
       allowNull: false,
    },
    imagen: {
      type: DataTypes.BLOB,
    },
    fecha_de_lanzamiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  });
};