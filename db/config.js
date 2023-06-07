const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      // useCreateIndex: true, // Deprecated
      // useFindAndModify: false, // Deprecated
    });
    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error al iniciar la BD ver logs');
  }
};

module.exports = {
  dbConnection,
};