import { Outlet } from "react-router-dom";

function Layout() {
    return (
      <>
        <nav className="navBar">
            <span className="navBrand">
                MovieHub
            </span>
        </nav>
        <Outlet />
      </>
    );
}

export default Layout