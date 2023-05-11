import {useLocation} from 'react-router-dom';
import styles from './MovieDetail.module.css'
import star from './public/star.png'
function MovieDetail() {
    const location = useLocation();
    const show = location.state.show;
    const score = (parseFloat(location.state.score)*10).toFixed(1);
    return (
        <>
            <div className={styles.movieCont}>
                {
                    show.image
                    ?
                    <div className={styles.movieImgCont}>
                        <img src={show.image.original} alt={show.name} />
                    </div>
                    :
                    ''
                }
                <div className={styles.movieDetailCont}>
                    <div className={styles.movieTitle}>
                        {show.name}
                    </div>
                    <div className={styles.movieScore}>
                        <img src={star} alt="Score:" className={styles.movieStar} />
                        {
                            show.rating.average ? show.rating.average : score
                        }/10
                    </div>
                    <div className={styles.otherMovieDetails}>
                        <div>
                            Premiered on {dateFormatter(show.premiered)}
                        </div>
                        <div>
                            Language: {show.language}
                        </div>
                        <div>
                            {show.runtime ? show.runtime + 'min' : ''} 
                            &bull;
                            {
                                show.genres.map((genre, i, {length}) => (
                                    i === length - 1 ? genre : genre + ', '
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.btnCont}>
                        <button>Book Tickets</button>
                    </div>
                </div>
            </div>
            <div className={styles.desCont}>
                <div className={styles.desTitle}>About the Show</div>
                <div className={styles.desDetail} dangerouslySetInnerHTML={{ __html: show.summary }}></div>
            </div>
        </>
    )
}

function dateFormatter(dateStr) {
    const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, month, date] = dateStr.split('-');
    return `${date} ${months[parseInt(month) - 1]}, ${year}`
}

export default MovieDetail;