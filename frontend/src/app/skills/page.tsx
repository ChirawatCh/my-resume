export default function Skills() {
  return (
    <section className="resume-content">
      <div className="container">
        <div className="card">
          <h2 className="card-title">Relevant Skills & Tools</h2>
        </div>
        
        <div className="card">
          <h3 className="card-title">AI and LLM Engineer</h3>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            Experienced in developing AI and large language model (LLM) systems for enterprise applications, focusing on Q&A chatbots and automation algorithms.
          </p>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            Proficient in leveraging retrieval-augmented generation (RAG) techniques and fine-tuning LLMs for domain-specific knowledge.
          </p>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            Continuously researches AI agents (multi-agents) and evaluates emerging technologies.
          </p>
          <p><strong>Tools:</strong> Hugging Face, VLLM, Llamaindex</p>
        </div>

        <div className="card">
          <h3 className="card-title">Automation & RPA</h3>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            Developed robotic automation for financial and business processes, resulting in decreasing error rates and manpower and time consumption.
          </p>
          <p><strong>Tools:</strong> Python, Power Automate, Robot Framework.</p>
        </div>

        <div className="card">
          <h3 className="card-title">Performance Testing</h3>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            Extensive experience in performance testing of APIs and web applications using industry-standard tools and methodologies.
          </p>
          <p><strong>Tools:</strong> Apache JMeter, Grafana K6, LoadRunner</p>
        </div>

        <div className="card">
          <h3 className="card-title">Backend Development</h3>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            Proficient in developing scalable backend APIs and cloud-native applications.
          </p>
          <p><strong>Tools:</strong> Python, FastAPI, AWS Lambda, DynamoDB, MongoDB</p>
        </div>

        <div className="card">
          <h3 className="card-title">DevOps & CI/CD</h3>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            Experience in implementing automated testing pipelines and deployment strategies.
          </p>
          <p><strong>Tools:</strong> Jenkins, Docker, AWS, Git</p>
        </div>
      </div>
    </section>
  )
}