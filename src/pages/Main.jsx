import { useEffect, useState } from 'react';
import styles from './Main.module.css'
import image from './public/no-image.png'
import { useNavigate } from 'react-router-dom'

function Main() {
    const [movies, setMovies] = useState([]);

    const navigate = useNavigate();

    const navigateTo = (movie) => navigate(`/${movie['show']['id']}`, {state: movie});

    useEffect(() => {
        getMovies().then(data => {
            setMovies(data)
        })
    }, [])

    return (
        <div className={styles.mainCont}>
            <div className={styles.movieListCont}>
                {
                    movies.map(each => (
                        <div key={each['show']['id']} className={styles.listItem} onClick={() => navigateTo(each)}>
                            <div className={styles.imgCont}>
                                <img src={each['show']['image'] != null ? each['show']['image']['medium'] : image } alt={each['show']['name']} />
                            </div>
                            <div className={styles.movieTitleCont}>
                                <div className={styles.movieTitle}>
                                    {
                                        each['show']['name']
                                    }
                                </div>
                                <div className={styles.movieGenre}>
                                    {
                                        each['show']['genres'].map((genre, i, {length}) => (
                                            i === length - 1 ? genre : genre + ', '
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const getMovies = () => {
    const data = fetch("https://api.tvmaze.com/search/shows?q=all")
    .then(data => data.json())
    return data;
}

export default Main;