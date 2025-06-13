export default function Projects() {
  return (
    <section className="resume-content">
      <div className="container">
        <div className="card">
          <h2 className="card-title">Recent Project</h2>
          
          <h3 className="card-title" style={{ fontSize: '1.5rem' }}>
            AI-Powered Customer Service Chatbot
          </h3>
          <ul>
            <li>Developed an on-premise AI-powered customer service chatbot leveraging a RAG (Retrieval-Augmented Generation) workflow with open-source LLM model like Gemma3, LLama3, Qwen3, etc</li>
            <li>Designed and implemented a secure, scalable architecture integrating OAuth 2.0 (OneLogin) for authentication, Chainlit for the user interface, MongoDB and Redis for chat history management, and Qdrant for vector-based document retrieval.</li>
            <li>Enabled real-time, context-aware responses by incorporating a text embedding server, delivering accurate and secure domain-specific support within a fully on-premises deployment.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}