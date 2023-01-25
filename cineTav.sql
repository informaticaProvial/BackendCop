CREATE DATABASE `cinetav` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
use cinetav;

-- peliculas
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    genre VARCHAR(255) NOT NULL
);

-- salas
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL
);


-- asientos
CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);


-- entradas
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    room_id INT NOT NULL,
    seat_id INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
    );

-- disponibilidad pelicula
CREATE TABLE availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    room_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);


-- ingreso de un dato como prueba
insert into movies (id, title, director, release_date, genre)
value( 2, "holy", "victor", "2022-01-01", "drama");

select * from movies;
select * from rooms;
select * from seats;

SELECT seats.id, seats.room_id, roww, number, status, price, name FROM seats
JOIN rooms ON seats.room_id = rooms.id;


ALTER TABLE movies modify id INT AUTO_INCREMENT PRIMARY KEY;
ALTER TABLE movies MODIFY title VARCHAR(255) NOT NULL DEFAULT '';

ALTER TABLE seats
ADD column roww VARCHAR(10),
ADD column number INT,
ADD column status ENUM('available', 'occupied'),
ADD column price DECIMAL(5,2);



