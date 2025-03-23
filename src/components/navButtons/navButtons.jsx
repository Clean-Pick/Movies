import {NavLink} from "react-router-dom";
import {motion} from "motion/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faUser} from "@fortawesome/free-solid-svg-icons";
import Discover from "../../../public/icons/Search.svg";

export default function NavButtons() {
    return (
        <ul className="container mx-10 xl:mx-50 flex justify-around">
            <li>
                <NavLink to="/" className="flex justify-center items-center">
                    {/* Home */}
                    <motion.div
                        className="flex bg-[#3d3c45] cursor-pointer h-10 lg:h-8 w-10 lg:w-8 rounded-4xl justify-center items-center"
                        initial={{
                            scale: 1,
                            backgroundImage: "",
                            color: "#7d7c82"
                        }}
                        whileHover={{
                            scale: 1.2,
                            backgroundImage: "linear-gradient(240deg, rgba(243,136,108,1) 0%, rgba(175,74,59,1) 100%)",
                            color: "rgba(255, 255, 255, 1)"
                        }}
                        whileTap={{scale: 0.5}}
                        transition={{
                            backgroundImage: {duration: 0.3, ease: "easeInOut"},
                            color: {duration: 0.3, ease: "easeInOut"}
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faHouse}
                            className="cursor-pointer h-10 lg:h-8 w-10 lg:w-8 text-current"
                        />
                    </motion.div>
                </NavLink>
            </li>

            <li>
                <NavLink to="/discover" className="flex justify-center items-center">
                    {/* Discover */}
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
                        whileTap={{scale: 0.5}}
                        transition={{
                            backgroundImage: {duration: 0.3, ease: "easeInOut"}
                        }}
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
                <NavLink to="/profile" className="flex justify-center items-center">
                    {/* Profile */}
                    <motion.div
                        className="flex bg-[#3d3c45] cursor-pointer h-10 lg:h-8 w-10 lg:w-8 rounded-4xl justify-center items-center"
                        initial={{
                            scale: 1,
                            backgroundImage: "",
                            color: "#7d7c82"
                        }}
                        whileHover={{
                            scale: 1.2,
                            backgroundImage: "linear-gradient(240deg, rgba(243,136,108,1) 0%, rgba(175,74,59,1) 100%)",
                            color: "rgba(255, 255, 255, 1)"
                        }}
                        whileTap={{scale: 0.5}}
                        transition={{
                            backgroundImage: {duration: 0.3, ease: "easeInOut"},
                            color: {duration: 0.3, ease: "easeInOut"}
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            className="cursor-pointer h-10 lg:h-8 w-10 lg:w-8 text-current"
                        />
                    </motion.div>
                </NavLink>
            </li>
        </ul>
    );
}