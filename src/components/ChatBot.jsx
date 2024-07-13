import React, { useState } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import MessageLoader from './MessageLoader';

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', message: 'Hello! How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { sender: 'user', message: inputValue }];
      setMessages(newMessages);
      setInputValue('');
      setLoading(true);

      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get(`http://172.210.36.34:8080/chatbot/${inputValue}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('API Response:', response); // Log the entire response object
        const botResponse = response.data.response; // Ensure this matches the backend response structure
        console.log('Bot Response:', botResponse); // Log the bot response
        setMessages([...newMessages, { sender: 'bot', message: botResponse }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages([...newMessages, { sender: 'bot', message: 'Sorry, something went wrong. Please try again.' }]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col lg:h-[70vh] h-[50vh] bg-white rounded-lg w-full">
      {/* ChatbotHeader */}
      <h1 className="p-4 border-b shadow-sm font-bold text-gray-800 text-xl">
        Your Assistant
      </h1>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col scrollbar-thin space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-md w-full max-w-xs text-xs break-words
            ${msg.sender === 'user' ? 'bg-indigo-600 self-end text-right text-white' : 
            'bg-gray-200 self-start text-left'}`}
          >
            {msg.message}
          </div>
        ))}
        {loading && (
          <div className="self-start my-2 p-2 rounded-md w-full max-w-xs bg-gray-200 text-left">
            <MessageLoader />
          </div>
        )}
      </div>

      {/* ChatInput */}
      <div className="flex flex-row items-center m-2 rounded-lg border">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          className="flex-1 p-2 text-xs outline-none" 
          placeholder="Type your message..." 
        />
        <FiSend onClick={handleSendMessage} className='text-gray-400 mr-2' />
      </div>
    </div>
  );
}

export default Chatbot;
