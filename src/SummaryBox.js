import './SummaryBox.css';
import close from './image/close.png';

function SummaryBox(props) {
    return <div id='summary-box'>
        <img src={ close} alt='close-tab' id='close-img' onClick={()=>props.update({selected_email_summary: ''})} />
        <p>{ props.summary}</p>
    </div>
}

export default SummaryBox;