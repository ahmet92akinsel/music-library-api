/* src/models/albums.js */

//const { FOREIGNKEYS } = require("sequelize/types/lib/query-types");
//const artist = require("./models")


module.exports = (connection, DataTypes) => {
    const schema = {
      name: DataTypes.STRING,
      year: DataTypes.STRING,
      //artist:FOREIGNKEYS
    };
  
    const AlbumModel = connection.define('Albums', schema);
    return AlbumModel;
  };

 