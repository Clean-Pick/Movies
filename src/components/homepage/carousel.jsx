"use client";

import {AnimatePresence, motion, usePresenceData, wrap} from "motion/react";
import {forwardRef, useEffect, useState} from "react";

export default function Carousel() {
    const items = [
        {id: 1, image: "../public/test/coco.jpg"},
        {id: 2, image: "../public/test/thegreenmile.webp"},
        {id: 3, image: "../public/test/backtothefuture.webp"},
        {id: 4, image: "../public/test/speedracer.webp"},
        {id: 5, image: "../public/test/spiderverse.webp"},
    ];
    const [selectedItem, setSelectedItem] = useState(0);
    const [direction, setDirection] = useState(1);
    const [screenSize, setScreenSize] = useState(getScreenSize());

    useEffect(() => {
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
                    <img src={items[wrap(0, items.length, selectedItem - 1)].image} alt="Previous"
                         style={arrowImage(screenSize)}/>

                    {/* Name box */}
                    <BottomBox screenSize={screenSize}/>
                    {/* IMDB score */}
                    <TopRightBox/>
                </motion.button>

                <AnimatePresence
                    custom={direction}
                    initial={false}
                    mode="popLayout"
                >
                    <Slide
                        key={selectedItem}
                        image={items[selectedItem].image}
                        screenSize={screenSize}
                    />
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
                    <img src={items[wrap(0, items.length, selectedItem + 1)].image} alt="Next"
                         style={arrowImage(screenSize)}/>

                    {/* Name box */}
                    <BottomBox screenSize={screenSize}/>
                    {/* IMDB score */}
                    <TopRightBox/>
                </motion.button>
            </div>
        </section>
    );
}

//--- CURRENT MOVIE ---//

const Slide = forwardRef(function Slide({image, screenSize}, ref) {
    const direction = usePresenceData();

    return (
        <motion.div
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
            style={{...box(screenSize), backgroundImage: `url(${image})`, position: 'relative'}}
            className="container flex justify-center items-center overflow-hidden"
        >
            {/* Name box */}
            <BottomBox screenSize={screenSize}/>
            {/* IMDB score */}
            <TopRightBox/>
        </motion.div>
    );
});


//--- STYLES ---//


const BottomBox = ({screenSize}) => {
    return (
        <div style={bottomBoxStyle(screenSize)}
             className="container flex justify-center items-center w-9/10 h-2/10 md:h-3/10 lg:h-2/10 bg-gray-300/30 backdrop-blur-xs rounded-[20px]">
            <p className="capitalize">nom du film</p>
        </div>
    );
};


const TopRightBox = () => {
    return (
        <div style={topRightBoxStyle()} className="absolute top-4 right-4 bg-gray-300/30 p-2 rounded-[20px]">
            <p className="uppercase text-xs text-left">imdb</p>
            <div className="container flex gap-5 p-1">
                <div className="container flex gap-5 p-1 w-full h-auto">
                    <img src="../../../public/icons/Star.svg"
                         alt="Star for IMDB rating (out of 10)"
                         className="w-5 h-auto"
                    />
                </div>
                {/* IMDB SCORE HERE */}
                <p className="text-lg">7.0</p>
            </div>
        </div>
    );
};

// This cannot be deleted or the App will just show a blank background
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
