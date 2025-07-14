import { useState } from 'react'
import './App.css'
import { fetchGeminiResponse } from './openai';


function App() {
async function handleAskGemini() {
  const answer = await fetchGeminiResponse('Hello Gemini!');
  console.log(answer);
}

  return (
    <>
    <div className='body flex flex-col bg-black min-w-screen overflow-y-hidden  min-h-screen' >
      <div className='flex flex-1 '>
    
      <div className="leftsidebar w-1/5 border-r border-gray-600 ">
        <div className='upperleftsidebar flex  flex-col gap-6 justify-center items-center pl-3 h-3/4'> 
          <div className ='logo flex items-center gap-2'>
          <img src="src/assets/chatgpt.svg" alt="chatgpt-logo" />
          <h1 className='text-white text-2xl font-bold'>ChatGPT</h1>
          </div>
          <div className='new_chat_button bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-fit'>
            <button>+New Chat</button>
          </div>
          <div className="flex flex-col gap-4 pb-4">
            <div className=' border border-gray-600 p-3 flex items-center justify-center mr-3'>  
              <button>
                <img src="/home/shubh/Documents/React-chatgpt/src/assets/message.svg" alt="messeage-logo"/>
                   <h3 className ="text-white">What is programming?</h3>
              </button>
                   
            </div>
            <div className=' border border-gray-600 p-3 flex items-center justify-center mr-3'>  
                   <button>
                    <img src="/home/shubh/Documents/React-chatgpt/src/assets/message.svg" alt="messeage-logo"/>
                   <h3 className ="text-white">What is programming?</h3>
                   </button>
            </div>
            
          </div>
        </div>
         <div className="lowersidebar h-1/4 border-t border-gray-600 flex flex-col gap-4 justify-center items-center">  
            <div className=''>
              <button className='home_button flex  gap-4'>
                <img src="src/assets/home.svg" alt="home_image" />
                <h3 className='text-white'>Home</h3>
                </button>
            </div>
           <div className=''>
              <button className='rocket_button flex  gap-4'>
                <img src="src/assets/rocket.svg" alt="rocket_image" />
                <h3 className='text-white'>Rocket</h3>
                </button>
            </div>
         </div>
         
      </div>
      <div className='right_sidebar w-7/8  justify-around items-center flex flex-col gap-4 flex-1'>/

      <div className='header w-full   text-white flex flex-col items-center justify-between px-4'>
      <div className="question w-3/6 bg-slate-900 rounded-lg p-3 flex gap-3">
      <img src="src/assets/user-icon.png" alt="chat_gpt-logo" className="block h-10 w-10"/>
      <p className='text-white'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere exercitationem officia eaque! Dolor, vitae. Sequi cupiditate natus odio dolorum veritatis corrupti, quibusdam delectus temporibus exercitationem a soluta praesentium, architecto doloribus!
      </p>
      </div>
    <div className="paragraph w-3/6 bg-blue-700 rounded-lg p-3 flex  gap-3" >
     <img src="src/assets/chatgptLogo.svg" alt="chat_gpt-logo" className="block h-10 w-10"/>
      <p className='text-white'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere exercitationem officia eaque! Dolor, vitae. Sequi cupiditate natus odio dolorum veritatis corrupti, quibusdam delectus temporibus exercitationem a soluta praesentium, architecto doloribus!
      </p>
    </div>
    </div>
      <div className="input_area w-3/6 flex flex-col gap-4">
      
  <div className="p-3 flex border bg-black border-gray-300 rounded-lg items-center gap-2">
    <textarea
      id="message"
      className="bg-black w-full h-24 overflow-y-auto resize-none focus:outline-none text-white"
      placeholder="Type your message here..."
    ></textarea>

    <button className="h-10 w-10 flex items-center justify-center">
      <img src="src/assets/send.svg" alt="send_button" className="h-6 w-6" />
    </button>
    
  </div>
 </div>
      </div>
    </div>
    <div className='footer bg-gray-800 text-white text-center py-4 w-full h-11 flex justify-center overflow-hidden' value={input} onChange={(e) => setInput(e.target.value)} onClick={handleAskGemini}>
      <p>&copy; 2025 ChatGPT Clone. All rights reserved.</p>
  </div>
</div>

 
    </>
  )
}

export default App
