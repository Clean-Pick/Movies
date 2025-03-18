import NavButtons from "./navButtons/navButtons.jsx";

export default function Footer() {
    return (
        <footer
            className="
            fixed bottom-0
            w-screen flex lg:hidden
            py-[35px]
            z-20
            bg-moviesBg
            drop-shadow-[0_-10px_50px_rgba(0,0,0,1)]
            "
        >

            <section className="flex lg:hidden
            w-screen
            justify-around">

                <NavButtons/>

            </section>

        </footer>
    );
}