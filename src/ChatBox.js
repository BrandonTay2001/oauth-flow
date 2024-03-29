import './ChatBox.css';
import close from './image/close.png';
import send from './image/send.png';
import React, { useRef } from 'react';

function ChatBox(props) {
    const messageBoxRef = useRef(null);

    const handleSendClick = () => {
        const messageBox = messageBoxRef.current;
        props.send_message(messageBox.value);
        if (messageBox) {
            messageBox.value = ''; 
        }
    };
    return <div id="chat-box">

        <div id='top-row'>
            <img src={close} alt='close-tab' id='close-logo' onClick={() => props.update({ selected_chat: false, message_list: [] })} />
        
            <select id='message-type' name="messageType" value={ props.chat_type} onChange={(e)=>props.update({selected_chat_type: e.target.value})}>
                <option key={ 0} value='0' >White-List</option>
                <option key={1} value='1'> Preference</option>
            </select>
        </div>

        <div id='message-record'>
            {props.message_list.map((e, index) => {
                return <p key={index} className='past-message'>{e}</p>;
            })}
        </div>

        <input type='text' id='message-box' ref={messageBoxRef}/>
        <img src={send} alt='send-logo' id='send-logo' onClick={handleSendClick} />
    </div>;
}
export default ChatBox;