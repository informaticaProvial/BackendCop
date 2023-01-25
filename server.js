const express = require('express');
const router = express.Router();
const mysql = require('mysql');


const cors = require('cors');
const { application } = require('express');
const app = express();
const bodyParser = require('body-parser')


// para que no bloqueara la solicitud htpp ya que es solamente de prueba
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');

    next();
  });
  

// Connect to MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'cinetav'
});


connection.connect((err) => {
    if (err) throw err;
    console.log('Successfully connected to the database.'); 
});


// -------------- MOVIES --------------

// Manejar solicitud POST para agregar una película
app.post("/movies", (req, res) => {
    // Obtener los datos de la nueva película
    const { title, director, release_date, genre } = req.body;
  
    // Construir la consulta SQL para insertar la nueva película
    const sql = `INSERT INTO movies (title, director, release_date, genre) VALUES ('${title}', '${director}', '${release_date}', '${genre}')`;

    if (!release_date) {
        return res.status(400).json({
            error: "La fecha de lanzamiento es requerida"
        });
    }
    
    // Ejecutar la consulta SQL
    connection.query(sql, (error, result) => {
      if (error) {
        // Enviar una respuesta de error al cliente
        return res.status(500).json({
          error: error.message
        });
      }
  
      // Enviar una respuesta de éxito al cliente
      res.json({
        message: "Película agregada exitosamente"
      });
    });
  });  

    // all movies
    app.get('/movies', (req, res) => {
        // Obtener todas las películas de la base de datos
        connection.query('SELECT * FROM movies', (error, results) => {
            if (error) {
                return res.status(500).send(error);
            }
            res.json(results);
        });
    });

    // movie id
    app.get('/movies/:id', (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM movies WHERE id = ${id}`;
        connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results[0]);
        });
    });


    // Manejar solicitud DELETE para eliminar una película
    app.delete("/movies/:id", (req, res) => {
        // Obtener el ID de la película a eliminar
        const movieId = req.params.id;
    
        // Construir la consulta SQL para eliminar la película
        const sql = `DELETE FROM movies WHERE id = ${movieId}`;
    
        // Ejecutar la consulta SQL
        connection.query(sql, (error, result) => {
        if (error) {
            // Enviar una respuesta de error al cliente
            return res.status(500).json({
            error: error.message
            });
        }
    
      // Enviar una respuesta de éxito al cliente
      res.json({
        message: "Película eliminada exitosamente"
      });
    });
  });
  

    // Manejar solicitud PUT para actualizar una película
    app.put("/movies/:id", (req, res) => {
        // Obtener el ID de la película a actualizar
        const movieId = req.params.id;
        // obtener los nuevos datos de la película
        const { title, director, release_date, genre } = req.body;

        // Construir la consulta SQL para actualizar la película
        const sql = `UPDATE movies SET title = '${title}', director = '${director}', release_date = '${release_date}', genre = '${genre}' WHERE id = ${movieId}`;

        // Ejecutar la consulta SQL
        connection.query(sql, (error, result) => {
        if (error) {
            // Enviar una respuesta de error al cliente
            return res.status(500).json({
            error: error.message
            });
        }

        // Enviar una respuesta de éxito al cliente
        res.json({
            message: "Película actualizada exitosamente"
        });
        });
    });



    // -------------- ROOMS --------------

  // Manejar solicitud POST para agregar una sala
  app.post("/rooms", (req, res) => {
    // Obtener los datos de la nueva sala
    const { name, capacity } = req.body;

    // Construir la consulta SQL para insertar la nueva sala
    const sql = `INSERT INTO rooms (name, capacity) VALUES ('${name}', '${capacity}')`;
    
    // Ejecutar la consulta SQL
    connection.query(sql, (error, result) => {
      if (error) {
        // Enviar una respuesta de error al cliente
        return res.status(500).json({
          error: error.message
        });
      }

      // Enviar una respuesta de éxito al cliente
      res.json({
        message: "Sala agregada exitosamente"
      });
    });
  });

  // all rooms
  app.get('/rooms', (req, res) => {
    // Obtener todas las salas de la base de datos
    connection.query('SELECT * FROM rooms', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});


// movie id
app.get('/rooms/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM rooms WHERE id = ${id}`;
  connection.query(query, (error, results) => {
  if (error) throw error;
  res.send(results[0]);
  });
});

  // Manejar solicitud DELETE para eliminar una sala
  app.delete("/rooms/:id", (req, res) => {
    // Obtener el ID de la sala a eliminar
    const roomId = req.params.id;

    // Construir la consulta SQL para eliminar la sala
    const sql = `DELETE FROM rooms WHERE id = ${roomId}`;

    // Ejecutar la consulta SQL
    connection.query(sql, (error, result) => {
    if (error) {
        // Enviar una respuesta de error al cliente
        return res.status(500).json({
        error: error.message
        });
    }

  // Enviar una respuesta de éxito al cliente
  res.json({
    message: "Sala eliminada exitosamente"
  });
  });
  });

  

    // Manejar solicitud PUT para actualizar una sala
    app.put("/rooms/:id", (req, res) => {
      // Obtener el ID de la sala a actualizar
      const roomId = req.params.id;
      // obtener los nuevos datos de la sala
      const { name, capacity } = req.body;

      // Construir la consulta SQL para actualizar la sala
      const sql = `UPDATE rooms SET name = '${name}', capacity = '${capacity}' WHERE id = ${roomId}`;

      // Ejecutar la consulta SQL
      connection.query(sql, (error, result) => {
      if (error) {
          // Enviar una respuesta de error al cliente
          return res.status(500).json({
          error: error.message
          });
      }

      // Enviar una respuesta de éxito al cliente
      res.json({
          message: "Sala actualizada exitosamente"
      });
      });
  });



  // -------------- ASSETS --------------

  // Manejar solicitud POST para agregar asiento
  app.post("/seats", (req, res) => {
    // Obtener los datos del asiento
    const { room_id, roww, number, status, price } = req.body;

    // Construir la consulta SQL para insertar asienti
    const sql = `INSERT INTO seats (room_id, roww, number, status, price) VALUES ('${room_id}', '${roww}', '${number}', '${status}', '${price}')`;
    
    // Ejecutar la consulta SQL
    connection.query(sql, (error, result) => {
      if (error) {
        // Enviar una respuesta de error al cliente
        return res.status(500).json({
          error: error.message
        });
      }

      // Enviar una respuesta de éxito al cliente
      res.json({
        message: "Asiento agregado exitosamente"
      });
    });
  });

  // all seats
  app.get('/seats', (req, res) => {
    // Obtener todos los asientos de la base de datos
    connection.query('SELECT seats.id, seats.room_id, roww, number, status, price, name FROM seats JOIN rooms ON seats.room_id = rooms.id', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

// seats id
app.get('/seats/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM seats WHERE id = ${id}`;
  connection.query(query, (error, results) => {
  if (error) throw error;
  res.send(results[0]);
  });
});

  // Manejar solicitud DELETE para eliminar un asiento
  app.delete("/seats/:id", (req, res) => {
    // Obtener el ID del asiento a eliminar
    const roomId = req.params.id;

    // Construir la consulta SQL para eliminar el asiento
    const sql = `DELETE FROM seats WHERE id = ${roomId}`;

    // Ejecutar la consulta SQL
    connection.query(sql, (error, result) => {
    if (error) {
        // Enviar una respuesta de error al cliente
        return res.status(500).json({
        error: error.message
        });
    }

  // Enviar una respuesta de éxito al cliente
  res.json({
    message: "Asiento eliminado exitosamente"
  });
  });
  });

  

    // Manejar solicitud PUT para actualizar asiento
    app.put("/seats/:id", (req, res) => {
      // Obtener el ID del asiento a actualizar
      const seatsId = req.params.id;
      // obtener los nuevos datos del asiento
      const { room_id } = req.body;

      // Construir la consulta SQL para actualizar asiento
      const sql = `UPDATE seats SET room_id = '${room_id}' WHERE id = ${seatsId}`;

      // Ejecutar la consulta SQL
      connection.query(sql, (error, result) => {
      if (error) {
          // Enviar una respuesta de error al cliente
          return res.status(500).json({
          error: error.message
          });
      }

      // Enviar una respuesta de éxito al cliente
      res.json({
          message: "Asiento actualizado exitosamente"
      });
      });
  });





// Iniciar el servidor
app.listen(3000, () => {
    console.log('Server started on port 3000');
});


