import {NavLink} from "react-router-dom";

export default function Header() {

    return (

        <section className="w-screen flex py-[32px]">

            <NavLink to={"/"} className="container mx-10 xl:mx-50 text-3xl">

                <h2>
                    <span className="text-orange-500">Movie</span>
                    Seeker
                </h2>

            </NavLink>

        </section>
    )

}