import Link from 'next/link'

const HomeContent = () => {
  return (
    <>
      <div className="card">
        <h2 className="card-title">Welcome</h2>
        <p style={{ color: 'var(--secondary-text-color)' }}>
          Hello, I&apos;m Chirawat Chitpakdee (EEE), a dedicated AI Workflow Engineer with a strong focus on integrating advanced AI technologies with robust automation strategies. I specialize in enhancing operational efficiency and fostering innovation through scalable and reliable systems. With deep expertise in performance testing, RPA, and AI deployment, I deliver tailored solutions that align with each organization&apos;s unique goals.
        </p>
        <Link 
          href="/resume_content/Chirawat's resume 2025.pdf" 
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
          <li>Lead development of AI and LLM systems for enterprise applications</li>
          <li>Design and implement RPA solutions to reduce errors and manual effort</li>
          <li>Conduct performance testing using Apache JMeter and Grafana K6</li>
          <li>Manage CI/CD pipelines with Jenkins for automated testing</li>
          <li>Develop backend APIs using Python and FastAPI deployed on AWS Lambda</li>
          <li>Mentor team members on Python multi-processing and RPA best practices</li>
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
          <li>Promoted digital transformation initiatives for Thai businesses</li>
          <li>Developed AI literacy programs and consultation services</li>
          <li>Supported adoption of RPA and automation technologies</li>
          <li>Collaborated with tech companies to enhance digital capabilities</li>
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
          <li>Conducted research in nanomaterials and applications</li>
          <li>Developed data analysis pipelines using Python and scientific libraries</li>
          <li>Published research findings in peer-reviewed journals</li>
          <li>Collaborated with industry partners on applied research projects</li>
        </ul>
      </div>
    </>
  )
}

export default HomeContent