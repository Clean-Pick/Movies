import {useEffect, useState} from "react";
import apiClient from "./apiClient.jsx";
import {motion} from "motion/react";

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
            <ul className="container flex flex-wrap gap-[20px] xl:gap-5 mt-[24px]  justify-between">
                {movies.map((movie, index) => {
                    const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

                    return (

                        <motion.li
                            key={movie.id}
                            className="flex justify-center relative
                                w-39 md:w-53 xl:w-70
                                h-50 md:h-80 xl:h-100
                                bg-white rounded-[30px]
                                mb-[30px] lg:mb-[60px] xl:mb-[100px]"
                            initial={{
                                scale: 0,
                                opacity: 0,
                                zIndex: 1
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                x: 0,
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                    delay: index * 0.05,
                                },

                            }}
                            exit={{opacity: 1}}
                            whileTap={{scale: 0.9}}
                            whileHover={{
                                scale: 1.1,
                                boxShadow: "0px 5px 5px #000",
                                zIndex: 10
                            }}
                            style={{
                                backgroundImage: `url(${posterUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >

                            <div
                                className="container flex justify-center items-center absolute
                                    bottom-[-42px] md:bottom-[-60px] xl:bottom-[-80px]
                                    w-10/10 h-2/10"
                            >
                                <p className="capitalize truncate">{movie.title} ({movie.release_date.substring(0, 4)})</p>
                            </div>


                        </motion.li>


                    );
                })}
            </ul>
            {loading && <div className="text-2xl">Loading more movies...</div>}
        </section>
    )
};


export default MovieList;