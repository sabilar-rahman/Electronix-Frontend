import { Link } from "react-router-dom";


const NavbarLogo = () => {
    return (
        <div>
            <Link to="/">

                <h1 className="font-bold"><span className=" hover:text-red-500">Electro</span><span className="text-lg text-red-500 hover:text-black">nix</span></h1>
            </Link>
        </div>
    );
};

export default NavbarLogo;
