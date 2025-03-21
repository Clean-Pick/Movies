import {NavLink} from "react-router-dom";
import {motion} from "motion/react";
import Home from "../../../public/icons/Home.svg";
import Discover from "../../../public/icons/Search.svg";
import Profile from "../../../public/icons/Profile.svg";

export default function NavButtons() {
    return (
        <ul className="container mx-10 xl:mx-50 flex justify-around">
            <li>
                <NavLink to="/"
                         className="flex justify-center items-center"
                >
                    <motion.img
                        src={Home}
                        alt="Home Icon"
                        className="cursor-pointer h-10 lg:h-8 w-10 lg:w-8"
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
                        className="flex bg-[#3d3c45] cursor-pointer h-10 lg:h-8 w-10 lg:w-8 rounded-4xl justify-center items-center"
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
                        className="cursor-pointer h-10 lg:h-8 w-10 lg:w-8"
                        initial={{scale: 1}}
                        whileHover={{scale: 1.2}}
                        whileTap={{scale: 0.9}}
                    />
                </NavLink>
            </li>
        </ul>
    )
}