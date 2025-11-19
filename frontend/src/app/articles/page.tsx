import Image from 'next/image'

export default function Articles() {
  return (
    <section className="resume-content">
      <div className="container">
        <div className="card">
          <div className="section-header">
            <i className="fas fa-newspaper section-icon"></i>
            <h2 className="card-title" style={{ marginBottom: 0 }}>Published Articles</h2>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <i className="fas fa-chart-line section-icon"></i>
            <h2 className="card-title" style={{ marginBottom: 0 }}>LLM Inference Engines Performance Testing</h2>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '0 0 auto' }}>
                <Image
                  src="/images/perftest_article.png"
                  alt="LLM Inference Engines Performance Testing"
                  width={300}
                  height={225}
                  className="article-image"
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '2px solid var(--light-gray-color)'
                  }}
                />
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <p style={{
                  color: 'var(--secondary-text-color)',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem',
                  fontSize: '1.05rem'
                }}>
                  This article discusses the performance testing of LLM inference engines, comparing SGLang and vLLM. A comprehensive analysis of throughput, latency, and resource utilization across different model sizes and configurations.
                </p>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span className="skill-badge">SGLang</span>
                  <span className="skill-badge">vLLM</span>
                  <span className="skill-badge">Performance Testing</span>
                  <span className="skill-badge">LLM</span>
                </div>
                <a
                  href="https://medium.com/@occlubssk/llm-inference-engines-performance-testing-sglang-vs-vllm-cfd2a597852a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-download inline-flex items-center gap-2"
                  style={{ textDecoration: 'none' }}
                >
                  <i className="fas fa-external-link-alt"></i>
                  Read the full article
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}