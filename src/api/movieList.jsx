import {useEffect, useState} from "react";
import apiClient from "./apiClient.jsx";
import MovieCard from "../components/discover/movieCard.jsx";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true)
            try {
                const response = await apiClient.get('/discover/movie', {
                    params: {page: page},
                });

                // Filtrer duplicates
                setMovies(prevMovies => {
                    const newMovies = response.data.results;
                    const allMovies = [...prevMovies, ...newMovies];

                    const uniqueMovies = Array.from(new Set(allMovies.map(movie => movie.id)))
                        .map(id => allMovies.find(movie => movie.id === id));

                    console.log('Unique Movies:', uniqueMovies);

                    return uniqueMovies;

                })


            } catch (error) {
                console.error('Error fetching movies:', error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }


        fetchMovies()
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            // Vérifier si l'utilisateur a atteint le bas de la page
            if (!loading && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
                if (!loading) {
                    setPage(prevPage => prevPage + 1);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    if (loading && page === 1) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <section className="mx-10 xl:mx-50">
            <h1>Movie List</h1>

            <ul className="container flex flex-wrap gap-[20px] xl:gap-5 mt-[24px] justify-between">
                
                {movies.map((movie, index) => (

                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        index={index}
                    />

                ))}
            </ul>
            {loading && <div className="text-2xl">Loading more movies...</div>}
        </section>
    );
};


export default MovieList;