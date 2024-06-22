import React, { useRef, useState } from 'react'
import robotUrl from '../../asserts/istockphoto-1182595599-612x612.jpg'
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import './Chatbot.css'

const initialChat = { content: "hello i'm mario", role: 'assistant' }

export default function Chatbot() {
    const inputRef = useRef();
    const [botState, setBotState] = useState(false);
    const [chatHistory, setChatHistory] = useState(JSON.parse(localStorage.getItem('chatHistory')));
    const helperArray = [...chatHistory];
    const handleToggleChat = function () {
        setBotState(!botState)
        const chatbot = document.querySelector('.chatbot');
        !botState ? chatbot.style.opacity = '1' : chatbot.style.opacity = '0';
        !botState ? chatbot.style.visibility = 'visible' : chatbot.style.visibility = 'hidden';
    }
    const getResponse = async function (userMessage) {
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                messeges: helperArray
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };
        const result1 = await fetch("https://techtrack-be.vercel.app/api/v1/chatbot", requestOptions);
        const { response } = await result1.json();
        helperArray.push(response);
        setChatHistory(prevChatHistory => [...prevChatHistory, response]);
        localStorage.setItem('chatHistory', JSON.stringify(helperArray))
    }
    const handleSendMessage = function () {
        const inputMessage = inputRef.current.value.trim();
        const newMessage = { content: inputMessage, role: 'user' };
        setChatHistory(prevChatHistory => [...prevChatHistory, newMessage]);
        helperArray.push(newMessage);
        inputRef.current.value = '';
        getResponse();
    }
    return <>
        <div className="chatbot-toggler" onClick={handleToggleChat}>
            <span className={!botState ? undefined : 'hidden'} id='chatOpen'><ChatIcon /></span>
            <span className={botState ? undefined : 'hidden'} id='chatClose'><CloseIcon /></span>
        </div>
        <div className={`chatbot`}>
            <div className="chat-bot-content">

                <div className="header">
                    <h1> Chatbot </h1>
                </div>

                <ul className="chat">
                    <li className={`message assistant`}>
                        <img src={robotUrl} alt={initialChat.type} />
                        <span>{initialChat.content}</span>
                    </li>
                    {chatHistory.length !== 0 && chatHistory.map((singleChat, chatIndex) => <li key={chatIndex} className={`message ${singleChat.role}`}>
                        {singleChat.role === 'user' ? <>
                            <span>{singleChat.content}</span>
                            <img src={robotUrl} alt={singleChat.type} />
                        </> : <>
                            <img src={robotUrl} alt={singleChat.type} />
                            <span>{singleChat.content}</span></>}
                    </li>)}
                    {chatHistory.length !== 0 && chatHistory[chatHistory.length - 1].role === "user" &&
                        <li className={`message assistant`}>
                            <img src={robotUrl} alt={initialChat.type} />
                            <span>Thinking...</span>
                        </li>}

                </ul>
                <div className="chat-input">
                    <input ref={inputRef} type="text" placeholder='Enter message' id='inputMessage' />
                    <button onClick={handleSendMessage}><SendIcon /></button>
                </div>
            </div>
            <div className="chatbot-modal">
            </div>
        </div>
    </>
}

