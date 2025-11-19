export default function Achievements() {
  return (
    <section className="resume-content achievements-section">
      <div className="container">
        <div className="card">
          <div className="section-header">
            <i className="fas fa-trophy section-icon"></i>
            <h2 className="card-title" style={{ marginBottom: 0 }}>Key Achievements</h2>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-brain section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>AI & LLM Infrastructure</h3>
          </div>
          <ul>
            <li><strong>Pioneered Open Source LLM Infrastructure:</strong> Initiated and deployed enterprise-grade Open Source LLM platform as OpenAI-compatible API services across CP Axtra organization (Lotus&apos;s and Makro), enabling business units to leverage AI capabilities without vendor lock-in</li>
            <li><strong>Multi-Model LLM Deployment:</strong> Successfully deployed and maintained 5+ state-of-the-art open source models including Gemma (Google), Meta-Llama, Qwen, GLM4.5, and Typhoon (SCB)</li>
            <li><strong>Cross-Functional AI Adoption:</strong> Led development of RAG-based chatbot for customer service FAQs and knowledge management, while enabling data cleansing workflows for Data Science teams</li>
          </ul>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-robot section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>RPA & Automation Pioneer</h3>
          </div>
          <ul>
            <li><strong>First RPA Implementation:</strong> Pioneered RPA and automation initiatives in CP Axtra using Python and Power Automate, establishing the foundation for organization-wide automation adoption</li>
            <li><strong>Cost Optimization:</strong> Reduced RPA licensing costs by 500K baht by transitioning from UiPath to Python-based and Power Automate solutions</li>
            <li><strong>Large-Scale Data Automation:</strong> Automated daily data reconciliation from 2,500+ databases (MSSQL & Oracle) to PowerBI dashboards, eliminating manual processes</li>
            <li><strong>Performance Optimization:</strong> Initiated Python multiprocessing techniques achieving 100% CPU utilization and trained RPA team members on implementation</li>
          </ul>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-server section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Backend API & Infrastructure Development</h3>
          </div>
          <ul>
            <li><strong>API-First RPA Approach:</strong> Transformed RPA processes by implementing backend API integration instead of frontend web crawling, improving reliability and performance</li>
            <li><strong>Serverless API Development:</strong> Designed and deployed scalable FastAPI backend services on AWS Lambda with DynamoDB</li>
            <li><strong>Advanced Algorithms:</strong> Developed data cleansing algorithms and semantic string-matching system with similarity scoring (0-100) for customer data quality improvement</li>
          </ul>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-network-wired section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Infrastructure & Deployment</h3>
          </div>
          <ul>
            <li><strong>RPA Infrastructure Setup:</strong> Established Power Automate machine infrastructure for low-code RPA deployment across business units</li>
            <li><strong>Linux Server Orchestration:</strong> Configured Linux servers with Cronicle scheduler for automated Python RPA job management</li>
            <li><strong>AI Server Deployment:</strong> Setup and configured AI servers for enterprise LLM API services, supporting multiple open-source models in production</li>
            <li><strong>Data Pipeline Orchestration:</strong> Implemented Apache Airflow for data pipeline automation and ETL workflow management</li>
          </ul>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-tachometer-alt section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Performance Testing & Monitoring</h3>
          </div>
          <ul>
            <li><strong>Automated Testing Framework:</strong> Implemented automated performance testing system on Jenkins using JMeter and K6</li>
            <li><strong>Real-Time Database Monitoring:</strong> Developed Grafana dashboards for real-time database monitoring and proactive issue detection</li>
            <li><strong>Proactive Monitoring:</strong> Initiated comprehensive notification system for database monitoring with MS Teams and Email alerts</li>
          </ul>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-chalkboard-teacher section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Knowledge Leadership</h3>
          </div>
          <ul>
            <li><strong>AI Literacy Advocacy:</strong> Provided expert consultation for AI application development and promoted AI literacy throughout the organization</li>
            <li><strong>Team Enablement:</strong> Conducted knowledge-sharing sessions on API performance testing for Dev/QA teams and Power Automate Desktop training for company-wide adoption</li>
          </ul>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-flask section-icon"></i>
            <h3 className="card-title" style={{ marginBottom: 0 }}>Research Background Achievements</h3>
          </div>
          <ul>
            <li><strong>Academic Publications:</strong> Published 17+ peer-reviewed articles with 335+ citations (h-index: 11) in international journals</li>
            <li><strong>ML-based Research:</strong> Developed ML-based predictive models for catalyst performance and material property screening</li>
            <li><strong>International Presentations:</strong> Presented at 10+ international conferences including EMRS2019 (Nice, France - oral), WATOC2017 (Munich, Germany)</li>
            <li><strong>Technical Education:</strong> Served as VASP computational software lecturer at Summer School workshops, training researchers in DFT methods</li>
          </ul>
        </div>
      </div>
    </section>
  )
}