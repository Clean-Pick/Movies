import React, {useEffect, useState} from "react";
import apiClient from "./apiClient.jsx";
import MovieCard from "../components/discover/movieCard.jsx";
import LoadingScreen from "../components/loadingScreen.jsx";
import ErrorBoundary from "../components/errorBoundary.jsx";

const MovieList = ({searchQuery}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setMovies([]);
        setPage(1);
    }, [searchQuery]);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const endpoint = searchQuery ? "/search/movie" : "/discover/movie";
                const params = searchQuery ? {query: searchQuery, page} : {page};
                const response = await apiClient.get(endpoint, {params});
                const newMovies = response.data.results;
                setMovies(prevMovies => (
                    searchQuery ? newMovies : [...prevMovies, ...newMovies]
                ));
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [page, searchQuery]);

    useEffect(() => {
        const handleScroll = () => {
            if (!loading && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
                setPage(prev => prev + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    if (loading && movies.length === 0) return <LoadingScreen/>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <section className="bg-moviesBg">
            <ul className="container flex flex-wrap gap-[20px] xl:gap-5 mt-[24px] justify-between">
                <ErrorBoundary>
                    {movies.map((movie, index) => (
                        <MovieCard key={`${movie.id}-${index}`} movie={movie} index={index}/>
                    ))}
                </ErrorBoundary>
            </ul>
            {loading && <div className="text-2xl"><LoadingScreen/></div>}
        </section>
    );
};

export default MovieList;