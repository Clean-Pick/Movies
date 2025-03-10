import {motion} from "motion/react";
import Home from "../../public/icons/Home.svg";
import Discover from "../../public/icons/Search.svg";
import Profile from "../../public/icons/Profile.svg"
import {NavLink} from "react-router-dom";

export default function Footer() {
    return (
        <footer
            className="
            fixed bottom-0
            w-screen flex
            py-[35px]
            z-10
            bg-moviesBg
            drop-shadow-[0_-10px_50px_rgba(0,0,0,1)]
            "
        >

            <ul className="container mx-10 xl:mx-50 flex justify-around">
                <li>
                    <NavLink to="/"
                             className="flex justify-center items-center"
                    >
                        <motion.img
                            src={Home}
                            alt="Home Icon"
                            className="cursor-pointer h-10 w-10"
                            initial={{scale: 1}}
                            whileHover={{
                                scale: 1.2,
                                fill: "#124568"
                            }}
                            whileTap={{scale: 0.9}}
                        />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/discover"
                             className="flex justify-center items-center"
                    >
                        <motion.div
                            className="flex bg-[#3d3c45] w-10 h-10 rounded-4xl justify-center items-center"
                            initial={{
                                scale: 1,
                                backgroundImage: ""
                            }}
                            whileHover={{
                                scale: 1.2,
                                backgroundImage: "linear-gradient(240deg, rgba(243,136,108,1) 0%, rgba(175,74,59,1) 100%)"
                            }}
                            whileTap={{scale: 0.9}}
                        >

                            <motion.img
                                src={Discover}
                                alt="Discover Icon"
                                className="cursor-pointer"
                                initial={{scale: 1}}
                                whileHover={{scale: 1.2}}
                                whileTap={{scale: 0.9}}
                            />

                        </motion.div>

                    </NavLink>
                </li>

                <li>
                    <NavLink to="/profile">
                        <motion.img
                            src={Profile}
                            alt="Profile Icon"
                            className="cursor-pointer h-10 w-10"
                            initial={{scale: 1}}
                            whileHover={{scale: 1.2}}
                            whileTap={{scale: 0.9}}
                        />
                    </NavLink>
                </li>
            </ul>
        </footer>
    );
}