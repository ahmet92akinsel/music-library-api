module.exports = (connection, DataTypes) => {
    const schema = {
      name: DataTypes.STRING,
      year: DataTypes.STRING,
    };
  
    const SongModel = connection.define('Songs', schema);
    return SongModel;
  };
