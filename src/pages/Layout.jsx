import { useEffect, useState } from 'react';
import { createContext } from "react";
import { Link, Outlet } from "react-router-dom";

export const DataContext = createContext();

function Layout() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies().then(data => {
        setMovies(data)
    });
    document.title = 'MovieHub'
  }, []);

  return (
      <DataContext.Provider value={movies}>
        <nav className="navBar">
            <Link className="navBrand" to="/">MovieHub</Link>
        </nav>
        <Outlet />
      </DataContext.Provider>
    );
}
const getMovies = () => {
  const data = fetch("https://api.tvmaze.com/search/shows?q=all")
  .then(data => data.json())
  return data;
}
export default Layout