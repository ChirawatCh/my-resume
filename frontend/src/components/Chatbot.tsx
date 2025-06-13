'use client'

import { useState, useEffect, useRef } from 'react'
import { marked } from 'marked'

interface Message {
  text: string
  sender: 'user' | 'bot'
  timestamp: string
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatBodyRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    { text: 'AI Experience', question: 'Tell me about your experience' },
    { text: 'Key Skills', question: 'What are your key skills?' },
    { text: 'Recent Project', question: 'Can you describe your recent project?' },
    { text: 'Contact Info', question: 'How can I contact you?' }
  ]

  useEffect(() => {
    // Initialize chat with welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        text: '👋 Hello! I\'m Chirawat Chitpakdee. How can I assist you today?',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([welcomeMessage])
    }
  }, [messages.length])

  useEffect(() => {
    // Listen for custom event from header
    const handleOpenChat = () => {
      setIsOpen(true)
    }
    
    window.addEventListener('openChat', handleOpenChat)
    return () => window.removeEventListener('openChat', handleOpenChat)
  }, [])

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, isTyping])

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      text,
      sender,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, newMessage])
  }

  const getGroqResponse = async (question: string): Promise<string> => {
    const GATEWAY_ENDPOINT = "https://puf76fk3fk.execute-api.ap-southeast-1.amazonaws.com/prod/chat"

    try {
      const response = await fetch(GATEWAY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      return data.message
    } catch (error) {
      console.error("Error calling backend API:", error)
      return "Sorry, I'm having trouble connecting to my brain right now. Please try again later."
    }
  }

  const sendMessage = async (messageText?: string) => {
    const message = messageText || inputValue.trim()
    if (!message || isTyping) return

    setIsTyping(true)
    addMessage(message, 'user')
    setInputValue('')

    try {
      const response = await getGroqResponse(message)
      addMessage(response, 'bot')
    } catch (error) {
      console.error('Error getting AI response:', error)
      addMessage('Sorry, I\'m having trouble connecting. Please try again.', 'bot')
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    sendMessage(question)
  }

  return (
    <div className="chatbot-container">
      <div className={`chat-window ${isOpen ? 'active' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-content">
            <i className="fas fa-user-headset"></i>
            <div>
              <h2>Talk with Me</h2>
              <div className="status">
                <div className="status-dot"></div>
                <span>Ask about my experience</span>
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}-message`}>
              <div className="message-content">
                <div 
                  className="message-text"
                  dangerouslySetInnerHTML={{ 
                    __html: message.sender === 'bot' ? marked(message.text) : message.text 
                  }}
                />
                <div className="message-timestamp">
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message bot-message">
              <div className="message-content">
                <div className="message-text">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="quick-questions-container">
          {quickQuestions.map((item, index) => (
            <button
              key={index}
              className="quick-question-btn"
              onClick={() => handleQuickQuestion(item.question)}
            >
              {item.text}
            </button>
          ))}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            className="message-input"
            placeholder="Ask about my qualifications..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <button 
            className="send-btn" 
            onClick={() => sendMessage()}
            disabled={isTyping}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot