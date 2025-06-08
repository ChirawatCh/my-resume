// --- SCRIPT (from script.js) ---
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links a");
    const resumeContainer = document.getElementById("resume-container");

    async function loadContent(page) {
        try {
            const response = await fetch(`pages/${page}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            resumeContainer.innerHTML = content;
        } catch (error) {
            console.error('Error loading page:', error);
            resumeContainer.innerHTML = `<p>Error loading content. Please try again later.</p>`;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const pageName = this.textContent.toLowerCase().replace(' ', '_');
            loadContent(pageName);
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    loadContent("home");
    navLinks[0].classList.add('active');

    // Hamburger Menu Toggle
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navLinksContainer = document.querySelector(".nav-links");

    hamburgerMenu.addEventListener("click", () => {
        navLinksContainer.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // --- CHATBOT LOGIC ---
    const letsTalkBtn = document.getElementById("letsTalkBtn");
    const chatWindow = document.getElementById("chatWindow");
    const closeBtn = document.getElementById("closeBtn");
    const chatBody = document.getElementById("chatBody");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const quickQuestions = document.getElementById("quickQuestions");

    let isTyping = false;

    function initializeChat() {
        const welcomeMessage = "👋 Hello! I'm Chirawat Chitpakdee. How can I assist you today?";
        addMessage(welcomeMessage, "bot");
    }
    // ... rest of the chatbot JS is unchanged ...
    quickQuestions.querySelectorAll(".quick-question-btn").forEach(button => {
        button.addEventListener("click", function () {
            const question = this.getAttribute("data-question");
            messageInput.value = question;
            sendMessage();
        });
    });
    function smoothScrollToBottom() { chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' }); }
    function showTypingIndicator() {
        const typingIndicator = `
            <div class="chat-message bot-message" id="typing-indicator">
                <div class="message-content">
                    <div class="message-text">
                        <div class="typing-dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            </div>`;
        chatBody.insertAdjacentHTML('beforeend', typingIndicator);
        smoothScrollToBottom();
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById("typing-indicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    letsTalkBtn.addEventListener("click", () => { chatWindow.classList.toggle("active"); if (chatWindow.classList.contains("active")) messageInput.focus(); });
    closeBtn.addEventListener("click", () => chatWindow.classList.remove("active"));
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message && !isTyping) {
            isTyping = true;
            messageInput.disabled = true;
            sendBtn.disabled = true;
            addMessage(message, "user");
            messageInput.value = "";
            showTypingIndicator();
            try {
                const response = await getGroqResponse(message);
                addMessage(response, "bot", true);
            } catch (error) {
                console.error("Error getting AI response:", error);
                addMessage("Sorry, I'm having trouble connecting. Please try again.", "bot");
            } finally {
                removeTypingIndicator();
                messageInput.disabled = false;
                sendBtn.disabled = false;
                messageInput.focus();
                isTyping = false;
            }
        }
    }
    function addMessage(text, sender, useTypewriter = false) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message", `${sender}-message`);
        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");
        const messageText = document.createElement("div");
        messageText.classList.add("message-text");
        messageContent.appendChild(messageText);
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageTimestamp = document.createElement("div");
        messageTimestamp.classList.add("message-timestamp");
        messageTimestamp.textContent = timestamp;
        messageContent.appendChild(messageTimestamp);
        messageDiv.appendChild(messageContent);
        chatBody.appendChild(messageDiv);
        if (sender === "bot" && useTypewriter) {
            typeWriter(messageText, text, () => smoothScrollToBottom());
        } else {
            messageText.textContent = text;
            smoothScrollToBottom();
        }
    }
    function typeWriter(element, text, callback, speed = 30) {
        let i = 0;
        element.innerHTML = "";
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i); i++;
                smoothScrollToBottom();
                setTimeout(type, speed);
            } else if (callback) { callback(); }
        }
        type();
    }
    let resumeContent = "";
    // Fetch resume content from external file
    fetch("./resumeContent.txt")
        .then((response) => response.text())
        .then((text) => {
            resumeContent = text;
        })
        .catch((error) => {
            console.error("Error fetching resume content:", error);
            resumeContent = "Error loading resume content.";
        });
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
                            content: `
                        You are Chirawat Chitpakdee (ชื่อไทย: จิรวัฒน์ จิตภักดี, ชื่อเล่น: อี๋). Speak and respond as yourself in all interactions.

                        Your answers must be:
                        - Accurate, concise, and professional
                        - Friendly and approachable, written in a natural tone — as if you're speaking directly to the person asking
                        - In the **same language** as the user's input — always reply in the language the question was asked

                        Do not:
                        - Refer to yourself in the third person
                        - Use phrases like "According to my resume" or "Based on the information provided"
                        - Use markdown formatting
                        - Answer questions unrelated to you
                        `
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
            },
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.choices[0].message.content;
    }

    initializeChat();
    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });
});
