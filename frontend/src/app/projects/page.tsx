export default function Projects() {
  return (
    <section className="resume-content">
      <div className="container">
        <div className="card">
          <h2 className="card-title">Key Projects</h2>
        </div>

        <div className="card">
          <h3 className="card-title">Finance RPA Automation Platform</h3>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            <strong>Description:</strong> Designed and developed comprehensive RPA automation platform handling 80+ workflows for Finance and Accounting departments, automating critical processes including bank statement reconciliation, payment processing, transaction verification, and invoice management.
          </p>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            <strong>Core Capabilities:</strong> Auto-download reports/statements from multiple sources, multi-database reconciliation (2,500+ databases), web form automation, file upload/download (SharePoint, SFTP), automated notifications (Email, MS Teams), transaction and invoice validation.
          </p>
          <p><strong>Technologies:</strong> Python, Power Automate, MSSQL, Oracle, SharePoint</p>
          <p><strong>Impact:</strong> Eliminated manual data entry across 80+ finance workflows, reduced reconciliation time from days to hours, improved data accuracy for daily PowerBI dashboards</p>
        </div>

        <div className="card">
          <h3 className="card-title">Enterprise AI & LLM Infrastructure</h3>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            <strong>Description:</strong> Led end-to-end implementation of enterprise AI infrastructure including LLM API services, AI server maintenance, and intelligent chatbot solutions across multiple business units.
          </p>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            <strong>Key Solutions:</strong>
          </p>
          <ul>
            <li>Customer service AI agent with MCP-enabled function calling (user profile lookup, coin balance checks, FAQ responses)</li>
            <li>RAG chatbots for Finance (process approval) and Accounting (SQL agent for data queries)</li>
            <li>LLM-powered data cleansing pipeline for Data Science teams</li>
          </ul>
          <p><strong>Technologies:</strong> Python, FastAPI, vLLM, SGLang, LangChain, MCP, Gemma, Meta-Llama, Qwen, GLM4.5, Typhoon</p>
          <p><strong>Impact:</strong> Enabled AI adoption across organization, reduced data cleansing time by 70%, deployed internal customer service agent serving enterprise users</p>
        </div>

        <div className="card">
          <h3 className="card-title">Data Reconciliation & Service Monitoring System</h3>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            <strong>Description:</strong> Built enterprise-scale data reconciliation and service monitoring platform using Apache Airflow, managing 100+ DAGs for critical business operations including inventory management, payment processing, sales tracking, and system health monitoring.
          </p>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            <strong>Key Workflows:</strong> SOH (Stock-On-Hand) reconciliation, RMS-SIM data comparison, payment gateway monitoring (2C2P, True Money, Grab), promotion and pricing synchronization, product master data validation, transaction monitoring across all store formats.
          </p>
          <p><strong>Technologies:</strong> Python, Apache Airflow, MSSQL, PostgreSQL, Oracle, Grafana, SharePoint</p>
          <p><strong>Impact:</strong> Automated monitoring of 100+ critical business processes, proactive issue detection through real-time alerts, ensured data consistency across enterprise systems</p>
        </div>

        <div className="card">
          <h3 className="card-title">Enterprise API Performance Testing Framework</h3>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            <strong>Description:</strong> Established comprehensive performance testing framework for enterprise backend API services, ensuring scalability and reliability across mission-critical systems.
          </p>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            <strong>Services Tested:</strong> Coin balance system, workforce management, cloud migration services, cash office operations, tax invoice processing, shopping mission platform, register services, tax online system, notification APIs.
          </p>
          <p><strong>Technologies:</strong> Apache JMeter, K6, Jenkins, Grafana, Python</p>
          <p><strong>Impact:</strong> Identified and resolved performance bottlenecks pre-production, ensured API reliability under high load, established performance benchmarks for enterprise services</p>
        </div>
      </div>
    </section>
  )
}