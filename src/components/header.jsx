import {NavLink} from "react-router-dom";
import NavButtons from "./navButtons/navButtons.jsx";

export default function Header() {

    return (

        <section className="w-7/10 flex py-[32px] mx-10 xl:mx-50">

            <NavLink to={"/"} className="container text-3xl">

                <h2>
                    <span className="text-orange-500">Movie</span>
                    Seeker
                </h2>

            </NavLink>

            <section className="hidden lg:block">

                <NavButtons/>

            </section>

        </section>
    )

}