import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
      <>
        <nav className="navBar">
            <Link className="navBrand" to="/">MovieHub</Link>
        </nav>
        <Outlet />
      </>
    );
}

export default Layout