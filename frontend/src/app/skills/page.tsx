export default function Skills() {
  return (
    <section className="resume-content">
      <div className="container">
        <div className="card">
          <div className="section-header">
            <i className="fas fa-code section-icon"></i>
            <h2 className="card-title" style={{ marginBottom: 0 }}>Technical Skills</h2>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-laptop-code section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Programming & Scripting</h3>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Proficient:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">Python</span>
              <span className="skill-badge">FastAPI</span>
              <span className="skill-badge">Flask</span>
            </div>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Familiar:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="skill-badge">REST APIs</span>
              <span className="skill-badge">PyAutoGUI</span>
              <span className="skill-badge">Selenium</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-brain section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>AI & Large Language Models (LLM)</h3>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>AI Engineering:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">Hugging Face</span>
              <span className="skill-badge">LlamaIndex</span>
              <span className="skill-badge">LangChain</span>
              <span className="skill-badge">LangGraph</span>
              <span className="skill-badge">OpenAI</span>
              <span className="skill-badge">ChatGPT</span>
              <span className="skill-badge">Claude Code</span>
              <span className="skill-badge">Codex</span>
            </div>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>LLM Deployment:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">Open source LLM</span>
              <span className="skill-badge">vLLM</span>
              <span className="skill-badge">SGLang</span>
            </div>
            <p style={{ color: 'var(--secondary-text-color)', lineHeight: '1.8', marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>AI Integration:</strong> Model Context Protocol (MCP) for AI agent function calling and tool integration</p>
            <p style={{ color: 'var(--secondary-text-color)', lineHeight: '1.8', marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Expertise:</strong> Question-answering systems, Retrieval-Augmented Generation (RAG), LLM fine-tuning for domain-specific knowledge, LLM-based data cleansing</p>
            <p style={{ color: 'var(--secondary-text-color)', lineHeight: '1.8' }}><strong style={{ color: 'var(--gradient-start)' }}>Research:</strong> Multi-agent AI systems and creative LLM applications for business use cases</p>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-chart-bar section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Machine Learning & Data Science</h3>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>ML Libraries:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">TensorFlow</span>
              <span className="skill-badge">Keras</span>
              <span className="skill-badge">Scikit-learn</span>
              <span className="skill-badge">PyTorch</span>
            </div>
            <p style={{ color: 'var(--secondary-text-color)', lineHeight: '1.8', marginBottom: '1rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Classical ML Models:</strong> Logistic Regression (LR), Decision Tree (DT), Random Forest Regressor (RFR), Support Vector Machine (SVM), Gaussian Process Regression (GPR), K-Nearest Neighbors (KNN)</p>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Data Analysis:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">Pandas</span>
              <span className="skill-badge">NumPy</span>
              <span className="skill-badge">SciPy</span>
              <span className="skill-badge">Matplotlib</span>
            </div>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Statistical Tools:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="skill-badge">statsmodels</span>
              <span className="skill-badge">Data Studio</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-robot section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Automation & RPA</h3>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ color: 'var(--secondary-text-color)', lineHeight: '1.8', marginBottom: '1rem' }}><strong style={{ color: 'var(--gradient-start)' }}>RPA Development:</strong> Python-based robotic automation for financial and business processes</p>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Low-Code Platforms:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">Power Automate</span>
              <span className="skill-badge">Cloud Flow (Microsoft)</span>
              <span className="skill-badge">Make.com</span>
              <span className="skill-badge">n8n</span>
            </div>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Testing Automation:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">Playwright</span>
              <span className="skill-badge">Selenium</span>
              <span className="skill-badge">PyAutoGUI</span>
            </div>
            <p style={{ color: 'var(--secondary-text-color)', lineHeight: '1.8' }}><strong style={{ color: 'var(--gradient-start)' }}>Tools:</strong> BizRen, Pandas for workflow automation and data entry streamlining</p>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-cloud section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Cloud & DevOps</h3>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Cloud:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">AWS</span>
              <span className="skill-badge">Tencent</span>
            </div>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Containerization:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">Docker</span>
            </div>
            <p style={{ color: 'var(--secondary-text-color)', lineHeight: '1.8', marginBottom: '1rem' }}><strong style={{ color: 'var(--gradient-start)' }}>CI/CD:</strong> Jenkins for continuous integration and delivery pipelines</p>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Performance Testing:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">Apache JMeter</span>
              <span className="skill-badge">K6</span>
            </div>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Monitoring & Visualization:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="skill-badge">Grafana</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-database section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Databases</h3>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>SQL:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
              <span className="skill-badge">PostgreSQL</span>
              <span className="skill-badge">SQL Server</span>
              <span className="skill-badge">MSSQL</span>
            </div>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>NoSQL:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="skill-badge">MongoDB</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-project-diagram section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Data Engineering & Orchestration</h3>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ color: 'var(--secondary-text-color)', lineHeight: '1.8', marginBottom: '1rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Workflow Orchestration:</strong> Apache Airflow for data pipeline automation and ETL processes</p>
            <p style={{ color: 'var(--secondary-text-color)', lineHeight: '1.8' }}><strong style={{ color: 'var(--gradient-start)' }}>Data Pipeline:</strong> Design and implementation of scalable data workflows</p>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-atom section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Computational Chemistry (Research Background)</h3>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ color: 'var(--secondary-text-color)', lineHeight: '1.8', marginBottom: '1rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Methods:</strong> Density Functional Theory (DFT), ML for materials prediction</p>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--gradient-start)' }}>Software:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="skill-badge">VASP (Vienna Ab initio Simulation Package)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}