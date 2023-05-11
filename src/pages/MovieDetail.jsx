import {useLocation} from 'react-router-dom';
import styles from './MovieDetail.module.css'
import star from './public/star.png'
function MovieDetail() {
    const location = useLocation();
    const movie = location.state;
    return (
        <>
            <div className={styles.movieCont}>
                {
                    movie.show.image
                    ?
                    <div className={styles.movieImgCont}>
                        <img src={movie.show.image.medium} alt="movie.show.name" srcset="" />
                    </div>
                    :
                    ''
                }
                <div className={styles.movieDetailCont}>
                    <div className={styles.movieTitle}>
                        {movie.show.name}
                    </div>
                    <div className={styles.movieScore}>
                        <img src={star} alt="Score:" className={styles.movieStar} />
                        {(parseFloat(movie.score)*10).toFixed(1)}/10
                    </div>
                    <div className={styles.otherMovieDetails}>
                        {movie.show.runtime} min &bull;
                        {
                            movie.show.genres.map((genre, i, {length}) => (
                                i === length - 1 ? genre : genre + ', '
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail;