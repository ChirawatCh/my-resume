import Link from 'next/link'

const HomeContent = () => {
  return (
    <>
      <div className="card">
        <h2 className="card-title">Welcome</h2>
        <p style={{ color: 'var(--secondary-text-color)', marginBottom: '1rem' }}>
          <strong>&quot;Tech Lead Engineer | AI, RPA & Automation Workflow Specialist<br />
          Driving Digital Transformation Through Intelligent Automation&quot;</strong>
        </p>
        <p style={{ color: 'var(--secondary-text-color)' }}>
          Versatile automation engineer specializing in end-to-end business process transformation through cutting-edge technologies including Python, low-code platforms, and Agentic AI. Expert in designing and implementing intelligent automation solutions that streamline operations—from automated data reconciliation and real-time analytics to AI-powered chatbots (RAG) and API services. Proven track record in delivering measurable results through performance optimization, cost reduction, and scalable automation frameworks that transform routine processes into strategic advantages.
        </p>
        <Link
          href="/resume_content/Chirawat's Resume Nov2025.pdf"
          download
          className="btn-download inline-block mt-4 no-underline"
        >
          Download My Resume
        </Link>
      </div>

      <div className="card">
        <h3 className="card-title">Tech Lead Engineer</h3>
        <p style={{ color: 'var(--secondary-text-color)' }}>
          <strong>Company:</strong> CP Axtra - Lotus&apos;s
        </p>
        <p style={{ color: 'var(--secondary-text-color)' }}>
          <strong>Duration:</strong> 2022-present
        </p>
        <h5 style={{ marginTop: '1rem' }}>Key Responsibilities:</h5>
        <ul className="mt-2">
          <li>Lead design and implementation of automation solutions for business process optimization</li>
          <li>Architect and develop RPA workflows and intelligent automation systems</li>
          <li>Build and deploy AI-powered applications including RAG-based chatbots with MCP integration</li>
          <li>Design, deploy, and maintain enterprise AI API services and AI server infrastructure</li>
          <li>Provide expert consultation for AI application development and LLM-based data cleansing solutions</li>
          <li>Setup automation infrastructure: Power Automate machines, Linux servers with Cronicle scheduler, AI servers</li>
          <li>Drive digital transformation initiatives across multiple business units</li>
          <li>Mentor junior engineers and establish best practices for automation development</li>
        </ul>
      </div>

      <div className="card">
        <h3 className="card-title">Digital Economy Promotion Officer</h3>
        <p style={{ color: 'var(--secondary-text-color)' }}>
          <strong>Organization:</strong> depa (Digital Economy Promotion Agency)
        </p>
        <p style={{ color: 'var(--secondary-text-color)' }}>
          <strong>Duration:</strong> 2021-2022
        </p>
        <h5 style={{ marginTop: '1rem' }}>Key Responsibilities:</h5>
        <ul className="mt-2">
          <li>Promoted digital economy initiatives and supported SMEs in adopting digital technologies</li>
          <li>Developed and delivered digital skills training programs for workforce development</li>
          <li>Drove smart city initiatives through technology and innovation solutions</li>
          <li>Supported digital startup ecosystem through mentorship and resource provision</li>
          <li>Organized workshops, seminars, and provided technology consulting</li>
        </ul>
      </div>

      <div className="card">
        <h3 className="card-title">Research Assistant</h3>
        <p style={{ color: 'var(--secondary-text-color)' }}>
          <strong>Organization:</strong> National Nanotechnology Center (NSTDA)
        </p>
        <p style={{ color: 'var(--secondary-text-color)' }}>
          <strong>Duration:</strong> 2012-2021
        </p>
        <h5 style={{ marginTop: '1rem' }}>Key Responsibilities:</h5>
        <ul className="mt-2">
          <li>Conducted computational chemistry research using DFT and ML for materials design</li>
          <li>Investigated photophysical properties of organic materials for renewable energy applications</li>
          <li>Developed theoretical models for catalytic systems and CO2 electrochemical reduction</li>
          <li>Presented research findings at international conferences and delivered computational chemistry lectures</li>
        </ul>
        <h5 style={{ marginTop: '1rem' }}>Key Achievements:</h5>
        <ul className="mt-2">
          <li>Published 17+ peer-reviewed articles with 335+ citations (h-index: 11)</li>
          <li>Developed ML-based predictive models for catalyst performance and material property screening</li>
          <li>Presented at 10+ international conferences including EMRS2019 (Nice, France), WATOC2017 (Munich, Germany)</li>
          <li>Served as VASP computational software lecturer at Summer School workshops</li>
        </ul>
      </div>
    </>
  )
}

export default HomeContent