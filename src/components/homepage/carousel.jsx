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
        <section className="w-screen flex py-8 justify-center items-center overflow-hidden">
            <div style={container(screenSize)}>
                <motion.button
                    initial={false}
                    aria-label="Previous"
                    style={button(screenSize)}
                    onClick={() => setSlide(-1)}
                    whileTap={{scale: 0.9}}
                >
                    <img src={items[wrap(0, items.length, selectedItem - 1)].image} alt="Previous"
                         style={arrowImage(screenSize)}/>
                </motion.button>

                <AnimatePresence custom={direction} initial={false} mode="popLayout">
                    <Slide key={selectedItem} image={items[selectedItem].image} screenSize={screenSize}/>
                </AnimatePresence>

                <motion.button
                    initial={false}
                    aria-label="Next"
                    style={button(screenSize)}
                    onClick={() => setSlide(1)}
                    whileFocus={{outline: `2px solid #0cdcf7`}}
                    whileTap={{scale: 0.9}}
                >
                    <img src={items[wrap(0, items.length, selectedItem + 1)].image} alt="Next"
                         style={arrowImage(screenSize)}/>
                </motion.button>
            </div>
        </section>
    );
}

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
            exit={{opacity: 0, x: direction * -50}}
            style={{...box(screenSize), backgroundImage: `url(${image})`}}
        />
    );
});

/**
 * ==============   Styles   ================
 */

const container = (screenSize) => ({
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    gap: screenSize === 'mobile' ? 12 : 24,
});

const box = (screenSize) => ({
    width: screenSize === 'mobile' ? 258 : screenSize === 'tablet' ? 360 : 258,
    height: screenSize === 'mobile' ? 336 : screenSize === 'tablet' ? 640 : 336,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "30px",
});

const button = (screenSize) => ({
    width: screenSize === 'mobile' ? 224 : screenSize === 'tablet' ? 290 : 224,
    height: screenSize === 'mobile' ? 292 : screenSize === 'tablet' ? 390 : 292,
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: 0,
    zIndex: 1,
    outlineOffset: 2,
});

const arrowImage = (screenSize) => ({
    width: screenSize === 'mobile' ? 224 : screenSize === 'tablet' ? 290 : 224,
    height: screenSize === 'mobile' ? 292 : screenSize === 'tablet' ? 300 : 292,
    borderRadius: "30px",
    objectFit: "cover",
});

//test