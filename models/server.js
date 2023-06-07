const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.database();
    this.middlewares();
    this.routes();
  }

  async database() {
    try {
      dbConnection();
    } catch (error) {
      console.log(error);
      throw new Error('Error al iniciar la BD ver logs');
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use('/api/users', require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;