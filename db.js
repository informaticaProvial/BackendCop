/*const movies = [
    { id: 1, name: 'Pelicula 1', genre: 'Acción' },
    { id: 2, name: 'Pelicula 2', genre: 'Comedia' },
    { id: 3, name: 'Pelicula 3', genre: 'Drama' }
];*/

const rooms = [
    { id: 1, name: 'Sala 1', capacity: 50 },
    { id: 2, name: 'Sala 2', capacity: 100 },
    { id: 3, name: 'Sala 3', capacity: 150 }
];

const showings = [
    { id: 1, movie_id: 1, room_id: 1, start_time: '2022-10-01T19:00:00' },
    { id: 2, movie_id: 2, room_id: 2, start_time: '2022-10-01T21:00:00'}
];

const movies = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        director: "Frank Darabont",
        releaseDate: "1994-09-14",
        genre: "Drama"
    },
    {
        id: 2,
        title: "The Godfather",
        director: "Francis Ford Coppola",
        releaseDate: "1972-03-24",
        genre: "Crime, Drama"
    },
    {
        id: 3,
        title: "The Dark Knight",
        director: "Christopher Nolan",
        releaseDate: "2008-07-16",
        genre: "Action, Crime, Drama"
    }
];

const getMovies = () => {
    return movies;
}

const getMovieById = (id) => {
    return movies.find(movie => movie.id === id);
}

/*const addMovie = (movie) => {
    const newId = movies.length + 1;
    movie.id = newId;
    movies.push(
*/
