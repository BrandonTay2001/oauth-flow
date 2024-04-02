import close from './image/close.png';
import last from './image/before.png';
import next from './image/next.png'
import './DailySummary.css'
function DailySummary(props) {

    const handleLastPage = () => {
        props.update({ daily_page: Math.max(1, props.page - 1) });
    }

    const handleNextPage = () => {
            props.update({ daily_page: Math.min(props.page + 1, props.summary.length)});
    }

    return <div id='daily-summary-box'>
        <img src={ close} alt='close-tab' id='close-img' onClick={()=>props.update({daily_summary: [], daily_page: 0})} />
        <p id='summary'>{props.summary[props.page - 1]}</p>
        
        {
            props.page > 1 && <img src={last} alt='last-page' id='last-img' onClick={()=>handleLastPage()}/>
        }
        
        {
            props.page >= 1 && props.page !== props.summary.length && < img src={next} alt='next-page' id='next-img' onClick={()=>handleNextPage()}/>
        }
    </div>
}

export default DailySummary;
