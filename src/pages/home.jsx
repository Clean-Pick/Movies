import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Carousel from "../components/homepage/carousel.jsx";
import {motion} from "motion/react";
import PlayIcon from "../../public/icons/Play.svg";
import apiClient from "../api/apiClient.jsx";
import LoadingScreen from "../components/loadingScreen.jsx";

function Home() {
    const [randomMovie, setRandomMovie] = useState(null);
    const [backdropUrl, setBackdropUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRandomMovie = async () => {
            try {
                const randomPage = Math.floor(Math.random() * 10) + 1;
                const response = await apiClient.get(`/trending/movie/week?page=${randomPage}`);
                const movies = response.data.results;
                const randomIndex = Math.floor(Math.random() * movies.length);
                const selectedMovie = movies[randomIndex];
                setRandomMovie(selectedMovie);

                const imagesResponse = await apiClient.get(`/movie/${selectedMovie.id}/images`);
                const backdrops = imagesResponse.data.backdrops;
                if (backdrops.length > 0) {
                    setBackdropUrl(`https://image.tmdb.org/t/p/original/${backdrops[0].file_path}`);
                }
            } catch (error) {
                console.error('Error fetching random movie:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRandomMovie();
    }, []);

    const handleClick = () => {
        if (randomMovie) {
            window.scrollTo({top: 0, behavior: "smooth"});
            navigate(`/movie/${randomMovie.id}`);
        }
    };

    if (loading) return <LoadingScreen/>;

    return (
        <>
            <section className="w-screen h-auto flex justify-center lg:mt-[80px]">
                {randomMovie && backdropUrl && (
                    <div
                        className="flex flex-col container
                            w-full
                            h-[200px] md:h-[400px] lg:h-[700px]
                            mx-10 xl:mx-50
                            p-4
                            bg-cover bg-center
                            rounded-[30px]
                            shadow-lg"
                        style={{backgroundImage: `url(${backdropUrl})`}}
                    >
                        <div className="flex-grow"></div>
                        <div
                            className="container flex
                            w-8/10 lg:w-2/3 xl:w-1/2
                            h-4/10 md:h-3/10 lg:h-2/10
                            bg-moviesBg/50
                            backdrop-filter backdrop-blur-md
                            rounded-[20px]
                            border
                            border-t-1 border-l-1 border-b-0 border-r-0 border-[#504f56] border-opacity-100 border-t-[#504f56] border-l-[#504f56] border-b-transparent border-r-transparent"
                        >
                            <div className="flex w-1/3 justify-center items-center">
                                <motion.img
                                    onClick={handleClick}
                                    src={PlayIcon}
                                    alt="Play Icon"
                                    className="w-10 lg:w-20 h-auto cursor-pointer"
                                    initial={{scale: 1}}
                                    whileHover={{scale: 1.2}}
                                    whileTap={{scale: 0.9}}
                                />
                            </div>
                            <div className="flex flex-wrap
                            justify-center items-center
                            w-2/3 ">
                                <p className="w-full h-0 font-thin text-xs text-gray-300">Movie Spotlight</p>
                                <h4 className="w-full
                                    font-normal
                                    text-xl md:text-2xl lg:text-3xl xl:text-4xl
                                    truncate">{randomMovie.title}
                                </h4>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <section className="flex flex-wrap bg-moviesBg
                w-screen
                px-0 xl:px-50
                pb-30 lg:pb-30">

                <h2 className="pt-[32px] pb-[24px] mx-10 xl:mx-0 text-3xl capitalize">trending</h2>

                <Carousel/>
            </section>
        </>
    );
}

export default Home;