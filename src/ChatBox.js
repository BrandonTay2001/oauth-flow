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
    
    let msg_record = [];

    for (let i = 0; i < props.message_list.length; i++) {
        if (i % 2 === 0) {
            msg_record.push(<p key={i} className='past-message'>{props.message_list[i]}</p>);
        } else {
            msg_record.push(<p key={i} className='system-response'>{props.message_list[i]}</p>);
        }
    }
    
    return <div id="chat-box">

        <div id='top-row'>
            <img src={close} alt='close-tab' id='close-logo' onClick={() => props.update({ selected_chat: false, message_list: [] })} />
        
            <select id='message-type' name="messageType" value={ props.chat_type} onChange={(e)=>props.update({selected_chat_type: e.target.value})}>
                <option key={ 0} value='0' >White-List</option>
                <option key={1} value='1'>Preference</option>
                <option key={2} value='2'>Smart Search</option>
            </select>
        </div>

        <div id='message-record'>
            {msg_record}
        </div>

        <input type='text' id='message-box' ref={messageBoxRef}/>
        <img src={send} alt='send-logo' id='send-logo' onClick={handleSendClick} />
    </div>;
}
export default ChatBox;