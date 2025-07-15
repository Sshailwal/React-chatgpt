import { useState, useRef, useEffect } from 'react'
import './App.css'
import { fetchGeminiResponse } from './openai'; 

function App() {

  const msgEnd = useRef(null);
  const [input, setInput] = useState('');
  const[messages, setMessages] = useState([
    { text: "Hello, how can I assist you today?", isBot: true }
  ]);
  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
const handleSend= async() => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');
    try {
      const res = await fetchGeminiResponse(input);
      setMessages(msgs => [...msgs, { text: res, isBot: true }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { text: "Error: Could not get response.", isBot: true }]);
      console.error("Gemini API error:", err);
    }
  }; 

  async function handleAskGemini() {
    try {
      const res = await fetchGeminiResponse(input);
      console.log(res);
    } catch (err) {
      console.error("Gemini API error:", err);
    }
  }

  return (
    <>
      <div className='body flex flex-col bg-black min-w-screen overflow-y-hidden min-h-screen'>
        <div className='flex flex-1'>
          
          <div className="leftsidebar w-1/5 border-r border-gray-600">
            <div className='upperleftsidebar flex flex-col gap-6 justify-center items-center pl-3 h-3/4'> 
              <div className='logo flex items-center gap-2'>
               
               <img src="src/assets/chatgpt.svg" alt="chat_gpt logo" />
                <h1 className='text-white text-2xl font-bold'>ChatGPT</h1>
              </div>
              <div className='new_chat_button bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-fit'>
                <button onClick={() => setMessages([{ text: "Hello, how can I assist you today?", isBot: true }])}>+New Chat</button>
              </div>
              <div className="flex flex-col gap-4 pb-4">
                <div className='border border-gray-600 p-3 flex items-center justify-center mr-3'>  
                  <button className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <h3 className="text-white">What is programming?</h3>
                  </button>
                </div>
                <div className='border border-gray-600 p-3 flex items-center justify-center mr-3'>  
                  <button className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <h3 className="text-white">What is AI?</h3>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lowersidebar h-1/4 border-t border-gray-600 flex flex-col gap-4 justify-center items-center">  
              <div>
                <button className='home_button flex gap-4'>
                  <div className="w-6 h-6 rounded"><img src="src/assets/home.svg" alt="home_button" /></div>
                  <h3 className='text-white'>Home</h3>
                </button>
              </div>
              <div>
                <button className='rocket_button flex gap-4'>
                  <div className="w-6 h-6 rounded"><img src="src/assets/rocket.svg" alt="rocket_button" /></div>
                  <h3 className='text-white'>Rocket</h3>
                </button>
              </div>
            </div>
          </div>
          
          <div className='right_sidebar flex-1 justify-around items-center flex flex-col gap-4'>
            <div className='header w-full text-white flex flex-col items-center justify-between px-4'>
               {/* <div className="question w-3/6 bg-slate-900 rounded-lg p-3 flex gap-3">
                <img src="src/assets/user-icon.png" alt="user_icon" className="h-10 w-10"/>
                <p className='text-white'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere exercitationem officia eaque! Dolor, vitae. Sequi cupiditate natus odio dolorum veritatis corrupti, quibusdam delectus temporibus exercitationem a soluta praesentium, architecto doloribus!
                </p>
              </div>
              <div className="answer w-3/6 bg-blue-700 rounded-lg p-3 flex gap-3">
                <img src="src/assets/chatgptLogo.svg" alt="chatgptLogo" className="h-10 w-10"/>
                <p className='text-white'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere exercitationem officia eaque! Dolor, vitae. Sequi cupiditate natus odio dolorum veritatis corrupti, quibusdam delectus temporibus exercitationem a soluta praesentium, architecto doloribus!
                </p>
              </div>  */}
              {messages.map((message, index) => 
               <div className={message.isBot? "answer w-3/6 bg-blue-700 rounded-lg p-3 flex gap-3" : "question w-3/6 bg-slate-900 rounded-lg p-3 flex gap-3"} key={index}>
                <img src={message.isBot? "src/assets/chatgptLogo.svg": "src/assets/user-icon.png"} alt="chatgptLogo" className="h-10 w-10"/>
                <p className='text-white'>
                 {message.text}</p>
              </div>)}
            </div>
            <div ref={msgEnd}/>
            
            <div className="input_area w-3/6 flex flex-col gap-4">
              <div className="p-3 flex border bg-black border-gray-300 rounded-lg items-center gap-2">
                <textarea
                  id="message"
                  className="bg-black w-full h-24 overflow-y-auto resize-none focus:outline-none text-white"
                  placeholder="Type your message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <button className="h-10 w-10 flex items-center justify-center" onClick={handleSend}>
                  <div className="w-6 h-6 rounded" >
                    <img src="src/assets/send.svg" alt="send_image" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className='footer bg-gray-800 text-white text-center py-4 w-full h-11 flex justify-center overflow-hidden'>
          <p>&copy; 2025 ChatGPT Clone. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}

export default App
