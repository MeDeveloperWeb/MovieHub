import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import styles from './Form.module.css'

function Form() {
    const location = useLocation();
    const nav = useNavigate();
    const [show, setShow] = useState({});

    useEffect(()=> {
        console.log(location.state)
        if (location.state == null || localStorage.getItem(`book-show-${location.state.id}`)) nav('/');
        else setShow(location.state)
    }, [location.state, nav]);
    
    const bookTicket = (event) => {
        event.preventDefault();
        localStorage.setItem(`book-show-${show.id}`, true);
        nav(`/${show.id}/${show.name}`)
    }
    
    return (
        <form className={styles.formCont} onSubmit={bookTicket}>
            <div>
                <div className={styles.showTitle}>{show.name}</div>
                <span className={styles.labelText}>Language:</span> {show.language} <br/>
                <span className={styles.labelText}>Official Site:</span> <a href={show.officialSite}>{show.officialSite}</a> <br/>
                {
                    show.schedule && show.schedule.time
                        ?
                    <>
                    <span className={styles.labelText}>Timing:</span> {show.schedule?.time} <br/>
                    </>
                        :
                    ''
                }
                {
                    show.schedule && show.schedule.days[0]
                        ? 
                    <>
                        <label htmlFor="optionDay">Select Day:</label>
                        <select id="optionDay">
                            <option value="select" disabled defaultValue={'select'}>Select</option>
                            {
                                show.schedule?.days?.map((day, i) => (
                                    <option value="day" key={i}>{day}</option>
                                ))
                            }
                        </select>
                    </>
                        :
                    ''
                }
                <br/>
                <input type="submit" value="Book Ticket" />
            </div>
            
        </form>
    )
}

export default Form;