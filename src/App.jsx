import { useState, useRef, useEffect } from 'react'
import './App.css'
import { fetchOpenAIResponse } from './openai'

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
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

  const handleSend = async () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');
    try {
      const res = await fetchOpenAIResponse(input);
      setMessages(msgs => [...msgs, { text: res, isBot: true }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { text: "Error: Could not get response.", isBot: true }]);
      console.error("OpenAI API error:", err);
    }
  };

  return (
    <>
      <div className='body flex flex-col bg-black min-w-screen min-h-screen'>
        <div className='flex flex-1 flex-col md:flex-row'>

          {/* Left Sidebar */}
          <div className="leftsidebar w-full md:w-1/5 border-r border-gray-600 justify-around flex flex-col items-center  text-white"> 
            <div className='upperleftsidebar flex flex-col gap-6 items-center py-6 '>
              <div className='logo flex items-center gap-2'>
                <img src="src/assets/chatgpt.svg" alt="chat_gpt logo" />
                <h1 className='text-white text-xl md:text-2xl font-bold'>ChatGPT</h1>
              </div>
              <div className='new_chat_button bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'>
                <button onClick={() => setMessages([{ text: "Hello, how can I assist you today?", isBot: true }])}>
                  + New Chat
                </button>
              </div>
              <div className="flex flex-col gap-4 px-4 w-full">
                <div className='border border-gray-600 p-2'>
                  <button className="flex items-center gap-2 w-full" onClick={() => setInput("What is programming?")}>
                    <div className="w-3 h-3 bg-gray-400 rounded"></div>
                    <h3 className="text-white text-sm">What is programming?</h3>
                  </button>
                </div>
                <div className='border border-gray-600 p-2'>
                  <button className="flex items-center gap-2 w-full" onClick={() => setInput("What is AI?")}>
                    <div className="w-3 h-3 bg-gray-400 rounded"></div>
                    <h3 className="text-white text-sm">What is AI?</h3>
                  </button>
                </div>
              </div>
            </div>

            <div className="lowersidebar border-t w-full border-gray-600 py-4 flex flex-col gap-4 items-center justify-evenly">
              <button className='home_button flex gap-3 items-center'>
                <img src="src/assets/home.svg" alt="home_button" className="w-5 h-5" />
                <h3 className='text-white text-sm'>Home</h3>
              </button>
              <button className='rocket_button flex gap-3 items-center'>
                <img src="src/assets/rocket.svg" alt="rocket_button" className="w-5 h-5" />
                <h3 className='text-white text-sm'>Rocket</h3>
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className='right_sidebar flex-1 flex flex-col items-center gap-4 p-4'>
            <div className='messages-container w-full max-w-3xl text-white flex flex-col gap-4 overflow-y-auto h-[65vh]'>
              {messages.map((message, index) =>
                <div className={`${message.isBot ? "bg-blue-700" : "bg-slate-900"} w-full rounded-lg p-3 flex gap-3`} key={index}>
                  <img src={message.isBot ? "src/assets/chatgptLogo.svg" : "src/assets/user-icon.png"} alt="chatgptLogo" className="h-10 w-10" />
                  <p className='text-white'>{message.text}</p>
                </div>
              )}
              <div ref={msgEnd} />
            </div>

            <div className="input_area w-full max-w-3xl">
              <div className="p-3 flex border bg-black border-gray-300 rounded-lg items-center gap-2">
                <textarea
                  id="message"
                  className="bg-black w-full h-24 overflow-y-auto resize-none focus:outline-none text-white text-sm sm:text-base"
                  placeholder="Type your message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleEnter}
                ></textarea>
                <button className="h-10 w-10 flex items-center justify-center" onClick={handleSend}>
                  <img src="src/assets/send.svg" alt="send_image" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='footer bg-gray-800 text-white text-center py-4 w-full text-sm sm:text-base'>
          <p>&copy; 2025 ChatGPT Clone. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

export default App;
