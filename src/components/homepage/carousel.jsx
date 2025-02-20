import {motion} from 'motion/react';

export default function Carousel() {
    return (
        <section className="w-screen flex py-[32px]">
            <motion.button
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                onHoverStart={() => console.log('hover started!')}
            />
        </section>
    )
}