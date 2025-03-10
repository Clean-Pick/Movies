import {Route, Routes} from "react-router-dom";

import Home from "../pages/home.jsx";
import Discover from "../pages/discover.jsx";

export default function Nav() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/discover" element={<Discover/>}/>
        </Routes>
    )
}