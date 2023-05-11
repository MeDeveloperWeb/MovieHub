import {useParams, useNavigate} from 'react-router-dom';
import styles from './MovieDetail.module.css'
import star from './public/star.png'
import { DataContext } from './Layout'
import { useContext, useEffect, useState } from 'react';

function MovieDetail() {
    const {id} = useParams();
    const movies = useContext(DataContext);
    const [show, setShow] = useState({});
    const [score, setScore] = useState(0.0);
    const [booked, setBooked] = useState(false);

    useEffect(() => {
        for (let movie of movies) {
            if (parseInt(movie.show.id ) === parseInt(id)) {
                setShow(movie.show);
                setScore((parseFloat(movie.score)*10).toFixed(1));
            }
        }
        if (localStorage.getItem(`book-show-${id}`)) setBooked(true);
    }, [id, movies]);
    
    const nav = useNavigate();
    const openForm = () => (nav(`/book/${id}`, {state: show}))
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
                            show.rating && show.rating.average ? show.rating.average : score
                        }/10
                    </div>
                    <div className={styles.otherMovieDetails}>
                        {
                            show.premiered ? <div>Premiered on {dateFormatter(show.premiered)}</div> : ''
                        }
                        <div>
                            Language: {show.language}
                        </div>
                        <div>
                            {show.runtime ? show.runtime + 'min' : ''} 
                            &bull;
                            {
                                show.genres?.map((genre, i, {length}) => (
                                    i === length - 1 ? genre : genre + ', '
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.btnCont}>
                        {
                            booked
                                ?
                            <button disabled >Ticket Booked!</button>
                                :
                            <button onClick={openForm}>Book Tickets</button>
                        }
                        
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
    if (!dateStr) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, month, date] = dateStr.split('-');
    return `${date} ${months[parseInt(month) - 1]}, ${year}`
}

export default MovieDetail;