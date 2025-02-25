"use client";

import {AnimatePresence, motion, usePresenceData, wrap} from "motion/react";
import {forwardRef, useState} from "react";

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

    function setSlide(newDirection) {
        const nextItem = wrap(0, items.length, selectedItem + newDirection);
        setSelectedItem(nextItem);
        setDirection(newDirection);
    }

    return (
        <section className="w-screen flex py-[32px] justify-center align-middle overflow-hidden">
            <div style={container}>
                <motion.button
                    initial={false}
                    aria-label="Previous"
                    style={button}
                    onClick={() => setSlide(-1)}
                    whileTap={{scale: 0.9}}
                >
                    <img src={items[wrap(0, items.length, selectedItem - 1)].image} alt="Previous" style={arrowImage}/>
                </motion.button>

                <AnimatePresence custom={direction} initial={false} mode="popLayout">
                    <Slide key={selectedItem} image={items[selectedItem].image}/>
                </AnimatePresence>

                <motion.button
                    initial={false}
                    aria-label="Next"
                    style={button}
                    onClick={() => setSlide(1)}
                    whileFocus={{outline: `2px solid #0cdcf7`}}
                    whileTap={{scale: 0.9}}
                >
                    <img src={items[wrap(0, items.length, selectedItem + 1)].image} alt="Next" style={arrowImage}/>
                </motion.button>
            </div>
        </section>
    );
}

const Slide = forwardRef(function Slide({image}, ref) {
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
            style={{...box, backgroundImage: `url(${image})`}}
        />
    );
});

/**
 * ==============   Styles   ================
 */

const container = {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
};

const box = {
    width: 258,
    height: 336,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "30px",
};

const button = {
    width: 224,
    height: 292,
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: 0,
    zIndex: 1,
    outlineOffset: 2,
};

const arrowImage = {
    width: 224,
    height: 292,
    borderRadius: "30px",
    objectFit: "cover",
};