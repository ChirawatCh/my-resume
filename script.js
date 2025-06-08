document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const letsTalkBtn = document.getElementById("letsTalkBtn");
  const chatWindow = document.getElementById("chatWindow");
  const closeBtn = document.getElementById("closeBtn");
  const chatBody = document.getElementById("chatBody");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const quickQuestions = document.getElementById("quickQuestions");

  let resumeContent = "";
  let isTyping = false;

  // Initialize chat with welcome message
  function initializeChat() {
    const welcomeMessage = "👋 Hello! I'm เสี่ยวหยู, Chirawat's AI assistant. Feel free to ask me anything about his experience, skills, or projects!";
    addMessage(welcomeMessage, "bot");
  }

  // Add event listeners to quick question buttons
  quickQuestions.querySelectorAll(".quick-question-btn").forEach(button => {
    button.addEventListener("click", function() {
      const question = this.getAttribute("data-question");
      messageInput.value = question;
      sendMessage();
    });
  });

  // Add smooth scrolling and better animations
  function smoothScrollToBottom() {
    chatBody.scrollTo({
      top: chatBody.scrollHeight,
      behavior: 'smooth'
    });
  }

  // Enhanced typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("chat-message", "bot-message", "typing-indicator");
    
    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    messageContent.innerHTML = `<div class="loading-dots"><span></span><span></span><span></span></div>`;
    
    typingDiv.appendChild(messageContent);
    chatBody.appendChild(typingDiv);
    smoothScrollToBottom();
    
    return typingDiv;
  }

  function removeTypingIndicator() {
    const typingIndicator = chatBody.querySelector(".typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Fetch resume content from external file
  fetch("resumeContent.txt")
    .then((response) => response.text())
    .then((text) => {
      resumeContent = text;
    })
    .catch((error) => {
      console.error("Error fetching resume content:", error);
      resumeContent = "Error loading resume content.";
    });

  // Toggle chat window
  letsTalkBtn.addEventListener("click", function () {
    chatWindow.classList.toggle("active");
    if (chatWindow.classList.contains("active")) {
      messageInput.focus();
    }
  });

  closeBtn.addEventListener("click", function () {
    chatWindow.classList.remove("active");
  });

  // Send message function
  async function sendMessage() {
    const message = messageInput.value.trim();
    if (message && !isTyping) {
      isTyping = true;
      
      // Disable input and button
      messageInput.disabled = true;
      sendBtn.disabled = true;
      
      // Add user message
      addMessage(message, "user");
      messageInput.value = "";

      // Show enhanced typing indicator
      const typingIndicator = showTypingIndicator();

      // Get bot response
      try {
        const response = await getGroqResponse(message);
        removeTypingIndicator();
        addMessage(response, "bot");
      } catch (error) {
        console.error("Error getting Groq response:", error);
        removeTypingIndicator();
        addMessage(
          "Sorry, I'm having trouble connecting to the AI. Please try again later.",
          "bot"
        );
      } finally {
        // Re-enable input and button
        messageInput.disabled = false;
        sendBtn.disabled = false;
        messageInput.focus();
        isTyping = false;
      }
    }
  }

  // Enhanced add message function
  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", `${sender}-message`);

    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");

    const messageText = document.createElement("div");
    messageText.classList.add("message-text");

    if (sender === "bot") {
        typeWriter(messageText, text, 30);
    } else {
        messageText.textContent = text;
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageTimestamp = document.createElement("div");
    messageTimestamp.classList.add("message-timestamp");
    messageTimestamp.textContent = timestamp;

    messageContent.appendChild(messageText);
    messageContent.appendChild(messageTimestamp);
    messageDiv.appendChild(messageContent);
    chatBody.appendChild(messageDiv);
    smoothScrollToBottom();
  }

  initializeChat();

  // Typewriter effect for bot messages
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = "";
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
        smoothScrollToBottom();
      }
    }
    
    type();
  }

  async function getGroqResponse(question) {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a  professional assistant (Name: เสี่ยวหยู, Sex: Female) for Chirawat Chitpakdee (ชื่อไทย: จิรวัฒน์ จิตภักดี, ชื่อเล่น: อี๋). You respond on his behalf as his personal secretary. Provide accurate, concise, and professional answers, while maintaining a helpful and approachable tone. Avoid phrases like 'According to the resume' or 'Based on the information provided'. Answer naturally, as if you are assisting someone on behalf of Mr. Chirawat. Always reply in the same language as the user's question.",
            },
            {
              role: "assistant",
              content: `Resume of Chirawat Chitpakdee:\n\n${resumeContent}`,
            },
            {
              role: "user",
              content: question,
            },
          ],
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Groq API request failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Event listeners
  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

});
