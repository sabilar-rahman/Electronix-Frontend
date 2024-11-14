import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="fixed-nav-bar w-nav">
        {/* Navlinks here */}
        <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
          <ul className="nav__links">
            <li className="link">
              <Link to="/">Home</Link>
            </li>
            <li className="link">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="link">
              <Link to="/">Pages</Link>
            </li>
            <li className="link">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          {/* NavTitle here  */}
          <div className="nav__logo">
            <Link to="/">
              Electroni<span>x</span>
            </Link>
          </div>

          
          {/* NavIcons here  */}
          <div className="nav__icons relative">
            <span>
              <Link to="/search">
                <i className="ri-search-line"></i>
              </Link>
            </span>
            <span>
              <button className="hover:text-primary">
                <i className="ri-shopping-bag-line"></i>
                <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                  0
                </sup>
              </button>
            </span>
            <span>
              <i className="ri-user-2-line size-6 rounded-full cursor-pointer"></i>
            </span>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
