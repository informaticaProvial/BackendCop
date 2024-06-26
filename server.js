const express = require('express');
const router = express.Router();
const mysql = require('mysql');


const cors = require('cors');
const { application } = require('express');
const app = express();
const bodyParser = require('body-parser')

const multer = require('multer');


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
    host: '10.10.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'cop2009'
});


connection.connect((err) => {
    if (err) throw err;
    console.log('Successfully connected to the database.'); 
});

//--- LOGIN --
app.post('/login', (req, res) => {
  const { USUARIOC4, PASSWORD } = req.body;

  connection.query('SELECT * FROM usuarios WHERE USUARIOC4 = ? AND PASSWORD = ?', [USUARIOC4, PASSWORD], (err, result) => {
      if (err) {
          console.error('Error al realizar la consulta:', err);
          res.status(500).json({ error: 'Error al realizar la consulta' });
      } else {
          if (result.length > 0) {
              res.status(200).json({ message: 'Login exitoso' });
          } else {
              res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
          }
      }
  });
});



// -------------- ACCIDENTE VIAL --------------

// Manejar solicitud POST para agregar un Accidente vial
app.post("/accidente_vial", (req, res) => {
    // Obtener los datos del nuevo accidente vial
    const { title, director, release_date, genre } = req.body;
  
   // Suponiendo que las variables con los valores a insertar se encuentran definidas previamente
   // validar ERROR EN ESTE INSERT
// const sql = `INSERT INTO accidente_vial (reporte_num, numero_acc, fechaing, usuario, Tipoacc, horaacc, contob, atrop, perid, nomper, perfallf, perfafmen, perfafmay, perfallm, perfammen, perherf, perhfmen, perhfmay, perherm, perhmmen, perhmmay, lugtigss, datigss, lugthos, dathos, lugtsan, datsan, autppnc, autpmp, autpbm, autpbv, autpot, autpote, carret, carreto, kilometro, kilodir, longd, pend, direcc, super, cond, dert, tshor, tshbor, tsver, tssin, cdclim, tipclim, tipacc, dañveh, dañinf, dañinfe, hipev, hipff, hipfss, hipell, hipbd, hipht, hiprlp, hipcbel, hipec, hipep, hipcme, hipcp, hibp, hiplc, hipmlsc, hipmssc, hiprvnh, hipot) VALUES 
// ('${reporte_num}', '${numero_acc}', '${fechaing}', '${usuario}', '${Tipoacc}', '${horaacc}', '${contob}', '${atrop}', '${perid}', '${nomper}', '${perfallf}', '${perfafmen}', '${perfafmay}', '${perfallm}', '${perfammen}', '${perherf}', '${perhfmen}', '${perhfmay}', '${perherm}', '${perhmmen}', '${perhmmay}', '${lugtigss}', '${datigss}', '${lugthos}', '${dathos}', '${lugtsan}', '${datsan}', '${autppnc}', '${autpmp}', '${autpbm}', '${autpbv}', '${autpot}', '${autpote}', '${carret}', '${carreto}', '${kilometro}', '${kilodir}', '${longd}', '${pend}', '${direcc}', '${super}', '${cond}', '${dert}', '${tshor}', '${tshbor}', '${tsver}', '${tssin}', '${cdclim}', '${tipclim}', '${tipacc}', '${dañveh}', '${dañinf}', '${dañinfe}', '${hipev}', '${hipff}', '${hipfss}', '${hipell}', '${hipbd}', '${hipht}', '${hiprlp}', '${hipcbel}', '${hipec}', '${hipep}', '${hipcme}', '${hipcp}', '${hibp}', '${hiplc}', '${hipmlsc}', '${hipmssc}', '${hiprvnh}', '${hipot}')`;

    


    // Ejecutar la consulta SQL
    connection.query(sql, (error, result) => {
      if (error) {
        // Enviar una respuesta de error al usuario
        return res.status(500).json({
          error: error.message
        });
      }
  
      // Enviar una respuesta de éxito al usuario
      res.json({
        message: "Accidente vial agregado exitosamente"
      });
    });
  });  

    // all accidentes:vial
    app.get('/accidente_vial', (req, res) => {
        // Obtener todas los accidente_vial de la base de datos
        connection.query('SELECT * FROM accidente_vial', (error, results) => {
            if (error) {
                return res.status(500).send(error);
            }
            res.json(results);
        });
    });

    // accidente_vial numero_acc
    app.get('/accidente_vial/:id', (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM accidente_vial WHERE numero_acc = ${numero_acc}`;
        connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results[0]);
        });
    });


    // Manejar solicitud DELETE para eliminar un accidente_vial
    app.delete("/accidente_vial/:numero_acc", (req, res) => {
        // Obtener el numero_acc del accidente vial a eliminar
        const accidenteVialId = req.params.numero_acc;
    
        // Construir la consulta SQL para eliminar el accidente_vial
        const sql = `DELETE FROM accidente_vial WHERE numero_acc = ${accidenteVialId}`;
    
        // Ejecutar la consulta SQL
        connection.query(sql, (error, result) => {
        if (error) {
            // Enviar una respuesta de error al accidente_vial
            return res.status(500).json({
            error: error.message
            });
        }
    
      // Enviar una respuesta de éxito al accidente_vial
      res.json({
        message: "Accidente vial eliminado exitosamente"
      });
    });
  });
  

    // Manejar solicitud PUT para actualizar un accidente vial
    app.put("/accidente_vial/:numero_acc", (req, res) => {
        // Obtener el numero_acc del accidente_vial a actualizar
        const accidenteVialId = req.params.numero_acc;
        // obtener los nuevos datos del accidente_vial
        const { title, director, release_date, genre } = req.body;

        // Construir la consulta SQL para actualizar el accidente_vial
        const sql = `UPDATE accidente_vial SET title = '${title}', director = '${director}', release_date = '${release_date}', genre = '${genre}' WHERE numero_acc = ${accidenteVialId}`;

        // Ejecutar la consulta SQL
        connection.query(sql, (error, result) => {
        if (error) {
            // Enviar una respuesta de error al accidente_vial
            return res.status(500).json({
            error: error.message
            });
        }

        // Enviar una respuesta de éxito al accidente_vial
        res.json({
            message: "Accidente vial actualizado exitosamente"
        });
        });
    });


    // -------------- BLOQUEOS --------------

  // Manejar solicitud POST para agregar bloqueos
  app.post("/bloqueos", (req, res) => {
    // Obtener los datos de los bloqueos
    const { reporte_num, objeto_bloquea, grupo_social, demandas,
       heridos_mujeres_menores, heridos_mujeres_adultas,
        heridos_hombres_menores, heridos_hombres_adultos,
         muertos_mujeres_menores, muertos_mujeres_adultas,
          muertos_hombres_menores, traslados_a,
       autoridades_presentes, muertos_hombres_adultos,
        otrosasisten   } = req.body;

    // Construir la consulta SQL para insertar bloqueos
    const sql = `INSERT INTO bloqueos (reporte_num, objeto_bloquea,
       grupo_social, demandas,
      heridos_mujeres_menores, heridos_mujeres_adultas,
       heridos_hombres_menores, heridos_hombres_adultos,
        muertos_mujeres_menores, muertos_mujeres_adultas,
         muertos_hombres_menores, traslados_a,
      autoridades_presentes, muertos_hombres_adultos,
       otrosasisten) VALUES ('${reporte_num}', '${objeto_bloquea}',
        '${grupo_social}', '${demandas}', '${heridos_mujeres_menores}',
        '${heridos_mujeres_adultas}', '${heridos_hombres_menores}',
        '${heridos_hombres_adultos}', '${muertos_mujeres_menores}',
        '${muertos_mujeres_adultas}',  '${muertos_hombres_menores}',
        '${traslados_a}', '${autoridades_presentes}',
        '${muertos_hombres_adultos}', '${otrosasisten}',)`;
    
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
        message: "Bloqueo agregado exitosamente"
      });
    });
  });

  // all bloqueos
  app.get('/bloqueos', (req, res) => {
    // Obtener todos los bloqueos de la base de datos
    connection.query('SELECT * FROM bloqueos', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

// bloqueos id
app.get('/bloqueos/:reporte_num', (req, res) => {
  const reporte_num = req.params.reporte_num;
  const query = `SELECT * FROM bloqueos WHERE reporte_num = ${reporte_num}`;
  connection.query(query, (error, results) => {
  if (error) throw error;
  res.send(results[0]);
  });
});

  // Manejar solicitud DELETE para eliminar un bloqueos
  app.delete("/bloqueos/:reporte_num", (req, res) => {
    // Obtener el ID del asiento a eliminar
    const roomId = req.params.reporte_num;

    // Construir la consulta SQL para eliminar el bloqueos
    const sql = `DELETE FROM bloqueos WHERE id = ${roomId}`;

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
    message: "Bloqueo eliminado exitosamente"
  });
  });
  });

  

    // Manejar solicitud PUT para actualizar bloqueos
    app.put("/bloqueos/:id", (req, res) => {
      // Obtener el ID del bloqueos a actualizar
      const bloqueosId = req.params.id;
      // obtener los nuevos datos del bloqueos
      const { room_id } = req.body;

      // Construir la consulta SQL para actualizar bloqueos
      const sql = `UPDATE bloqueos SET room_id = '${room_id}' WHERE id = ${bloqueosId}`;

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
          message: "Bloqueo actualizado exitosamente"
      });
      });
  });



  // -------------- BRIGADAS --------------

  // Manejar solicitud POST para agregar un brigada
  app.post("/brigadas", (req, res) => {
    // Obtener los datos de los brigadas
    const { num_placa, brigada_nom, brigada_nit, telefono1, telefono2,
       telefono3, telefono4, activo } = req.body;

    // Construir la consulta SQL para insertar brigadas
    const sql = `INSERT INTO brigadas (num_placa, brigada_nom, brigada_nit, telefono1, telefono2,
      telefono3, telefono4, activo) VALUES ('${num_placa}', '${brigada_nom}',
      '${brigada_nit}',  '${telefono1}',  '${telefono2}',  '${telefono3}'
      '${telefono4}',  '${activo}' )`;
    
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
        message: "Brigada agregada exitosamente"
      });
    });
  });

  // all brigadas
  app.get('/brigadas', (req, res) => {
    // Obtener todos los brigadas de la base de datos
    connection.query('SELECT * FROM brigadas where activo = 1', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});


// brigadas id
app.get('/brigadas/:num_placa', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM brigadas WHERE num_placa = ${num_placa}`;
  connection.query(query, (error, results) => {
  if (error) throw error;
  res.send(results[0]);
  });
});

  // Manejar solicitud DELETE para eliminar brigadas
  app.delete("/brigadas/:num_placa", (req, res) => {
    // Obtener el ID de la brigadas a eliminar
    const brigadaId = req.params.num_placa;

    // Construir la consulta SQL para eliminar brigadas
    const sql = `DELETE FROM brigadas WHERE num_placa = ${brigadaId}`;

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
    message: "Brigada eliminado exitosamente"
  });
  });
  });

  

    // Manejar solicitud PUT para actualizar brigadas
    app.put("/brigadas/:num_placa", (req, res) => {
      // Obtener el ID de brigadas a actualizar
      const brigadaId = req.params.num_placa;
      // obtener los nuevos datos de brigadas
      const { name, capacity } = req.body;
      
      // Construir la consulta SQL para actualizar brigadas
      const sql = `UPDATE brigadas SET num_placa = '${num_placa}',
      brigada_nom = '${brigada_nom}',
      brigada_nit = '${brigada_nit}',
      telefono1 = '${telefono1}',
      telefono2 = '${telefono2}',
      telefono3 = '${telefono3}',
      telefono4 = '${telefono4}',
      activo = '${activo}' WHERE reporte_num = ${brigadaId}`;

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
          message: "Brigada actualizado exitosamente"
      });
      });
  });




    // -------------- REPORTES_OPERATIVOS --------------

  // Manejar solicitud POST para agregar un reportes_operativos
  app.post("/reportes_operativos", (req, res) => {
     // Obtener los datos de los reportes_operativos
  const {REPORTE_NUM, FECHA, HORA, UNIDAD_NUM, SECTOR, UBICACION, DIRECC_SENTIDO, REPORTE_TIPO, USUARIO, VALIDADO } = req.body;

  // Construir la consulta SQL para insertar reportes_operativos
  const sql = `INSERT INTO reportes_operativos (REPORTE_NUM, FECHA, HORA, UNIDAD_NUM, SECTOR, UBICACION, DIRECC_SENTIDO, REPORTE_TIPO, USUARIO, VALIDADO)
   VALUES ('${REPORTE_NUM}', '${FECHA}',
    '${HORA}',  '${UNIDAD_NUM}',  '${SECTOR}',  '${UBICACION}',
    '${DIRECC_SENTIDO}', '${REPORTE_TIPO}', '${USUARIO}', '${VALIDADO}')`;
  
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
      message: "Reporte operativo agregado exitosamente"
    });
  });
  });

  
  app.get('/reportes_operativos', (req, res) => {
    const { page, pageSize } = req.query; // Obtener los parámetros de paginación
    const currentPage = parseInt(page) || 1; // Página actual (por defecto 1)
    const itemsPerPage = parseInt(pageSize) || 10; // Elementos por página (por defecto 10)
  
    const currentDate = new Date().toISOString().split('T')[0];
  
    const offset = (currentPage - 1) * itemsPerPage; // Calcular el offset
  
    const query = `
    SELECT ro.REPORTE_NUM, ro.FECHA, ro.HORA, ro.UNIDAD_NUM, ro.SECTOR, ro.UBICACION, ro.DIRECC_SENTIDO, ro.REPORTE_TIPO, ro.USUARIO, ro.VALIDADO
    FROM reportes_operativos ro
    INNER JOIN unidades u ON ro.unidad_num = u.unidad_num
    WHERE (ro.unidad_num, ro.hora) IN (
        SELECT unidad_num, MAX(hora)
        FROM reportes_operativos
        WHERE fecha = CURDATE()
        GROUP BY unidad_num
    )
    AND ro.fecha = CURDATE() 
    ORDER BY ro.reporte_num DESC;`; // Agregar LIMIT y OFFSET a la consulta
  
    connection.query(
      query,
      [
        currentDate + ' 00:00:00',
        currentDate + ' 23:59:59',
        itemsPerPage,
        offset
      ],
      (error, results) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.json(results);
      }
    );
  });
  

     // all reportes_operativos para reportes
     app.get('/reportes_operativos_param', (req, res) => {
      const currentDate = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
  
      // Obtener los parámetros de la solicitud
      const filtroPatrulla = req.query.filtroPatrulla || ''; // Si no se proporciona, se toma como vacío
      const filtroKl = req.query.filtroKl || '';
      const filtroSituacion = req.query.filtroSituacion || '';
      const filtroSector = req.query.filtroSector || '';
      const fechaInicio = req.query.fechaInicio || (currentDate + ' 00:00:00'); // Si no se proporciona, se toma el inicio del día actual
      const fechaFin = req.query.fechaFin || (currentDate + ' 23:59:59'); // Si no se proporciona, se toma el final del día actual

      // Obtener los parámetros de paginación
      const page = req.query.page || 1; // Número de página actual
      const pageSize = req.query.pageSize || 10; // Tamaño de cada página

      // Calcular el índice de inicio y el límite para la paginación
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Construir la consulta SQL con los parámetros
      const query = `
      SELECT * 
      FROM reportes_operativos 
      WHERE fecha >= '${fechaInicio}' AND fecha <= '${fechaFin}'
        AND (sector = '${filtroSector}' OR '${filtroSector}' = '')
        AND (reporte_tipo = '${filtroSituacion}' OR '${filtroSituacion}' = '')
        AND (unidad_num = '${filtroPatrulla}' OR '${filtroPatrulla}' = '')
        AND (ubicacion = '${filtroKl}' OR '${filtroKl}' = '')
      ORDER BY fecha`;
  
  
      // Ejecutar la consulta
      connection.query(
          query,
          [fechaInicio, fechaFin,  filtroPatrulla, filtroKl,
            filtroSituacion,  filtroSector, pageSize, startIndex],
          (error, results) => {
              if (error) {
                  return res.status(500).send(error);
              }
              res.json(results);
          }
      );
  });

    // all tipos_reporte
    app.get('/tipos_reporte', (req, res) => {
      // Obtener todas los tipos_reporte de la base de datos
      connection.query('SELECT * FROM tipos_reporte', (error, results) => {
          if (error) {
              return res.status(500).send(error);
          }
          res.json(results);
      });
    });

    // reporte operativo desc
    app.get('/reportes_operativos_desc', (req, res) => {
      // Obtener todas los reportes_operativos de la base de datos
      connection.query('SELECT * FROM reportes_operativos order by fecha desc LIMIT 1', (error, results) => {
          if (error) {
              return res.status(500).send(error);
          }
          res.json(results);
      });
    });
  


  // reportes_operativos reporte_num
  app.get('/reportes_operativos/:reporte_num', (req, res) => {
    const reporte_num = req.params.reporte_num;
    const query = `SELECT * FROM reportes_operativos WHERE reporte_num = ${reporte_num}`;
    connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results[0]);
    });
  });


  // Manejar solicitud DELETE para eliminar reportes_operativos
  app.delete("/reportes_operativos/:reporte_num", (req, res) => {
    // Obtener el ID de la sala a eliminar
    const reporteOperativoId = req.params.reporte_num;

    // Construir la consulta SQL para eliminar reportes_operativos
    const sql = `DELETE FROM reportes_operativos WHERE reporte_num = ${reporteOperativoId}`;

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
    message: "Reporte Operativo eliminado exitosamente"
    });
    });
  });

  

    // Manejar solicitud PUT para actualizar reportes_operativos
    app.put("/reportes_operativos/:reporte_num", (req, res) => {
      // Obtener el ID de reportes_operativos a actualizar
      const reporteOperativoId = req.params.reporte_num;
      // obtener los nuevos datos de reportes_operativos
      const { name, capacity } = req.body;

      // Construir la consulta SQL para actualizar reportes_operativos
      const sql = `UPDATE reportes_operativos SET name = '${name}', capacity = '${capacity}' WHERE reporte_num = ${reporteOperativoId}`;

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
          message: "Reporte Operativo actualizado exitosamente"
      });
      });
  });


  // patrullajes unidad_num
  app.get('/patrullajes', (req, res) => {
    const unidad_num = req.query.UNIDAD_NUM; // Cambiado a req.query.UNIDAD_NUM
    const query = `
      SELECT *
      FROM patrullajes
      WHERE unidad_num = ${unidad_num}
        AND DATE(dia_turno) = CURDATE()
      ORDER BY dia_turno DESC
    `;
    connection.query(query, (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.json(results);
    });
  });

    // all patrullas
    app.get('/unidades', (req, res) => {
      // Obtener todos los unidades de la base de datos
      connection.query('SELECT * FROM unidades', (error, results) => {
          if (error) {
              return res.status(500).send(error);
          }
          res.json(results);
      });
  });
  

  app.put("/patrullajes/:unidad_num", (req, res) => {
    // Obtener el ID de patrullajes a actualizar
    const unidadId = req.params.unidad_num;
  
    // obtener los nuevos datos de patrullajes
    const { info } = req.body;
  
    // Construir la consulta SQL para actualizar patrullajes
    const sql = `UPDATE patrullajes SET INFO = ? WHERE unidad_num = ? AND DATE(dia_turno) = CURDATE()`;
  
    // Ejecutar la consulta SQL
    connection.query(sql, [info, unidadId], (error, result) => {
      if (error) {
        // Enviar una respuesta de error al cliente
        return res.status(500).json({
          error: error.message
        });
      }
  
      // Enviar una respuesta de éxito al cliente
      res.json({
        message: "Patrullaje actualizado exitosamente"
      });
    });
  });
  
  //------------------------------- UNIDADES ---------------------------


  // all unidades
  app.get('/unidades', (req, res) => {
    // Obtener todos los unidades de la base de datos
    connection.query('SELECT * FROM unidades where activo = 1', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});


// Iniciar el servidor
app.listen(3000, () => {
    console.log('Server started on port 3000');
});



// ------------------ OFICIOS ---------------------

// Manejar solicitud POST para agregar un oficio
app.post("/oficios", (req, res) => {
  // Obtener los datos de los oficios
  const { id, numero_oficio, fecha, dirigido, entrada_saliente,
     archivos_pdf, comentario, archivos_copia_pdf } = req.body;

  // Construir la consulta SQL para insertar oficios
  const sql = `INSERT INTO oficios (id, numero_oficio, fecha, dirigido, entrada_saliente,
    archivos_pdf, comentario, archivos_copia_pdf) VALUES ('${id}', '${numero_oficio}',
    '${fecha}',  '${dirigido}',  '${entrada_saliente}',  '${archivos_pdf}'
    '${comentario}',  '${archivos_copia_pdf}' )`;
  
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
      message: "Oficio agregada exitosamente"
    });
  });
});

// all brigadas
app.get('/oficios', (req, res) => {
  // Obtener todos los brigadas de la base de datos
  connection.query('SELECT * FROM oficios', (error, results) => {
      if (error) {
          return res.status(500).send(error);
      }
      res.json(results);
  });
});


// brigadas id
app.get('/oficios/:numero_oficio', (req, res) => {
const id = req.params.id;
const query = `SELECT * FROM oficios WHERE numero_oficio = ${numero_oficio}`;
connection.query(query, (error, results) => {
if (error) throw error;
res.send(results[0]);
});
});

// Manejar solicitud DELETE para eliminar oficios
app.delete("/oficios/:id", (req, res) => {
  // Obtener el ID de la oficios a eliminar
  const oficioId = req.params.id;

  // Construir la consulta SQL para eliminar oficios
  const sql = `DELETE FROM oficios WHERE id = ${oficioId}`;

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
  message: "Oficio eliminado exitosamente"
});
});
});



  // Manejar solicitud PUT para actualizar oficios
  app.put("/oficios/:num_placa", (req, res) => {
    // Obtener el ID de oficios a actualizar
    const oficioId = req.params.numero_oficio;
    // obtener los nuevos datos de oficios
    const { name, capacity } = req.body;
    
    // Construir la consulta SQL para actualizar oficios
    const sql = `UPDATE oficios SET numero_oficio = '${numero_oficio}',
    brigada_nom = '${brigada_nom}',
    brigada_nit = '${brigada_nit}',
    telefono1 = '${telefono1}',
    telefono2 = '${telefono2}',
    telefono3 = '${telefono3}',
    telefono4 = '${telefono4}',
    activo = '${activo}' WHERE reporte_num = ${oficioId}`;

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
        message: "Oficio actualizado exitosamente"
    });
    });
});

 /* const upload = multer({ storage });

  app.use(express.json());

  // Ruta para cargar un archivo al servidor
  app.post('/subir-archivo', upload.single('archivos_pdf'), (req, res) => {
    // Aquí puedes procesar el archivo y obtener su ruta en el servidor
    const filePath = req.file.path; // Esto obtiene la ruta del archivo en el servidor

    // Devuelve la ruta del archivo como respuesta
    res.json({ filePath });
  });*/


//  ----------------- INGRESO ORDEN ---------------------
app.post("/unidades_sectores", (req, res) => {
  // Obtener los datos de los unidades_sectores
  const {SECTOR_CODIGO, UNIDAD_NUM, DIA_TURNO, UNIDA_BRIGADA1, UNIDA_BRIGADA2, HORA_INICIO, HORA_FINAL } = req.body;

  // Construir la consulta SQL para insertar unidades_sectores
  const sql = `INSERT INTO unidades_sectores (SECTOR_CODIGO, UNIDAD_NUM, DIA_TURNO, UNIDA_BRIGADA1, UNIDA_BRIGADA2, HORA_INICIO, HORA_FINAL)
   VALUES ('${SECTOR_CODIGO}', '${UNIDAD_NUM}',
    '${DIA_TURNO}',  '${UNIDA_BRIGADA1}',  '${UNIDA_BRIGADA2}',  '${HORA_INICIO}',
    '${HORA_FINAL}')`;
  
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
      message: "Orden agregada exitosamente"
    });
  });
});

app.post("/c_odometro", (req, res) => {
  // Obtener los datos de los unidades_sectores
  const {unidad_num, usuario, fecha, odo_ant, odo_nue } = req.body;

  // Construir la consulta SQL para insertar unidades_sectores
  const sql = `INSERT INTO unidades_sectores (unidad_num, usuario, fecha, odo_ant,
    odo_nue) VALUES ('${unidad_num}', '${usuario}',
    '${fecha}',  '${odo_ant}',  '${odo_nue}')`;
  
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
      message: "Odometro agregado exitosamente"
    });
  });
});

//----------BITACORA------

/*app.get('/patrullajesbitacora', (req, res) => {
  const unidad_num = req.query.unidad_num;
  const fechaInicio = req.query.fechaInicio;
  const fechaFin = req.query.fechaFin;

  // Asegúrate de que las fechas estén en el formato adecuado para MySQL (YYYY-MM-DD)
  const fechaInicioFormatted = fechaInicio.toISOString().split('T')[0];
  const fechaFinFormatted = fechaFin.toISOString().split('T')[0];

  const query = `
    SELECT *
    FROM patrullajes
    WHERE unidad_num = ${unidad_num}
      AND dia_turno BETWEEN '${fechaInicioFormatted}' AND '${fechaFinFormatted}'
    ORDER BY dia_turno DESC
  `;
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});*/


     // all BITACORA para reportes
     app.get('/patrullajesbitacora', (req, res) => {
      const currentDate = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
  
      // Obtener los parámetros de la solicitud
      const filtroPatrulla = req.query.filtroPatrulla || ''; // Si no se proporciona, se toma como vacío
      const fechaInicio = req.query.fechaInicio || (currentDate + ' 00:00:00'); // Si no se proporciona, se toma el inicio del día actual
      const fechaFin = req.query.fechaFin || (currentDate + ' 23:59:59'); // Si no se proporciona, se toma el final del día actual

      // Obtener los parámetros de paginación
      const page = req.query.page || 1; // Número de página actual
      const pageSize = req.query.pageSize || 10; // Tamaño de cada página

      // Calcular el índice de inicio y el límite para la paginación
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Construir la consulta SQL con los parámetros
      const query = `
      SELECT * 
      FROM patrullajes 
      WHERE dia_turno >= '${fechaInicio}' AND dia_turno <= '${fechaFin}'
        AND (unidad_num = '${filtroPatrulla}' OR '${filtroPatrulla}' = '')
      ORDER BY dia_turno`;
  
  
      // Ejecutar la consulta
      connection.query(
          query,
          [fechaInicio, fechaFin,  filtroPatrulla, pageSize, startIndex],
          (error, results) => {
              if (error) {
                  return res.status(500).send(error);
              }
              res.json(results);
          }
      );
  });