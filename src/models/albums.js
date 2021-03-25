/* src/models/albums.js */

module.exports = (connection, DataTypes) => {
    const schema = {
      name: DataTypes.STRING,
      year: DataTypes.STRING,
    };
  
    const AlbumModel = connection.define('Albums', schema);
    return AlbumModel;
  };

 