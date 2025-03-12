"use client";

import {AnimatePresence, motion, usePresenceData, wrap} from "motion/react";
import React, {forwardRef, useEffect, useState} from "react";
import apiClient from "../../api/apiClient";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

export default function Carousel() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(0);
    const [direction, setDirection] = useState(1);
    const [screenSize, setScreenSize] = useState(getScreenSize());


    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await apiClient.get('/trending/movie/week');
                setItems(response.data.results);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        };

        fetchTrendingMovies();

        const handleResize = () => {
            setScreenSize(getScreenSize());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function getScreenSize() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile'; // Mobile
        if (width < 1024) return 'tablet'; // Tablet
        return 'desktop'; // Desktop
    }

    function setSlide(newDirection) {
        const nextItem = wrap(0, items.length, selectedItem + newDirection);
        setSelectedItem(nextItem);
        setDirection(newDirection);
    }


    return (
        <section className="container w-screen flex py-8 justify-center items-center overflow-hidden">
            <div style={container(screenSize)}>
                <motion.button
                    initial={false}
                    aria-label="Previous"
                    style={button(screenSize)}
                    onClick={() => setSlide(-1)}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 10px 5px #000"
                    }}
                    whileTap={{scale: 0.9}}
                >
                    {items.length > 0 && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${items[wrap(0, items.length, selectedItem - 1)].poster_path}`}
                            alt="Previous"
                            style={arrowImage(screenSize)}/>
                    )}
                </motion.button>

                <AnimatePresence
                    custom={direction}
                    initial={false}
                    mode="popLayout"
                >
                    {items.length > 0 && (
                        <Slide
                            key={selectedItem}
                            movie={items[selectedItem]}
                            screenSize={screenSize}
                        />
                    )}
                </AnimatePresence>

                <motion.button
                    initial={false}
                    aria-label="Next"
                    style={button(screenSize)}
                    onClick={() => setSlide(1)}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 10px 5px #000"
                    }}
                    whileTap={{scale: 0.9}}
                >
                    {items.length > 0 && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${items[wrap(0, items.length, selectedItem + 1)].poster_path}`}
                            alt="Next"
                            style={arrowImage(screenSize)}/>
                    )}
                </motion.button>
            </div>
        </section>
    );
}

const Slide = forwardRef(function Slide({movie, screenSize}, ref) {
    const direction = usePresenceData();
    const navigate = useNavigate();

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
        navigate(`/movie/${movie.id}`)
    }

    return (
        <motion.div
            onClick={handleClick}
            ref={ref}
            initial={{opacity: 0, x: direction * 50}}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                },
            }}
            whileTap={{scale: 0.9}}
            whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 5px #000"
            }}
            exit={{opacity: 0, x: direction * -50}}
            style={{
                ...box(screenSize),
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
                position: 'relative'
            }}
            className="container flex justify-center items-center overflow-hidden"
        >
            <BottomBox screenSize={screenSize} title={movie.title}/>
            <TopRightBox rating={movie.vote_average}/>
        </motion.div>
    );
});

const BottomBox = ({screenSize, title}) => {
    return (
        <div style={bottomBoxStyle(screenSize)}
             className="container flex
                justify-center items-center
                w-9/10
                h-2/10 md:h-3/10 lg:h-2/10
                bg-moviesBg/50
             backdrop-filter backdrop-blur-md
             p-2
             rounded-[20px]
             border
             border-t-1 border-l-1 border-b-0 border-r-0 border-[#504f56] border-opacity-100 border-t-[#504f56] border-l-[#504f56] border-b-transparent border-r-transparent">
            <p className="capitalize">{title}</p>
        </div>
    );
};

const TopRightBox = ({rating}) => {
    return (
        <div style={topRightBoxStyle()}
             className="absolute top-4 right-4
             p-2
             bg-moviesBg/50
             backdrop-filter backdrop-blur-md
             rounded-[20px]
             border
             border-t-1 border-l-1 border-b-0 border-r-0 border-[#504f56] border-opacity-100 border-t-[#504f56] border-l-[#504f56] border-b-transparent border-r-transparent">

            <p className="uppercase text-xs text-left">imdb</p>

            <div className="container flex gap-5 p-1">
                <div className="container
                    flex justify-center align-middle items-center
                    gap-5 p-1
                    w-full h-auto
                 ">

                    <FontAwesomeIcon icon={faStar} className="

                    text-[#f7d430]
                    text-2xl
                    "/>

                </div>

                <p className="text-lg">{rating.toFixed(1)}</p>

            </div>
        </div>
    );
};

const topRightBoxStyle = () => ({});

const bottomBoxStyle = (screenSize) => ({
    position: 'absolute',
    bottom: 20,
});

const container = (screenSize) => ({
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    gap: screenSize === 'mobile' ? 12 : 24,
});

const box = (screenSize) => ({
    width: screenSize === 'mobile' ? 258 : screenSize === 'tablet' ? 360 : 400,
    height: screenSize === 'mobile' ? 336 : screenSize === 'tablet' ? 640 : 700,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "30px",
});

const button = (screenSize) => ({
    width: screenSize === 'mobile' ? 224 : screenSize === 'tablet' ? 290 : 320,
    height: screenSize === 'mobile' ? 292 : screenSize === 'tablet' ? 390 : 560,
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: 0,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0)",
});

const arrowImage = (screenSize) => ({
    width: screenSize === 'mobile' ? 224 : screenSize === 'tablet' ? 290 : 320,
    height: screenSize === 'mobile' ? 292 : screenSize === 'tablet' ? 390 : 560,
    borderRadius: "30px",
    objectFit: "cover",
});