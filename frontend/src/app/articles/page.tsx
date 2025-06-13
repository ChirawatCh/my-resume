import Image from 'next/image'

export default function Articles() {
  return (
    <section className="resume-content">
      <div className="container">
        <div className="card">
          <h2 className="card-title">LLM Inference Engines Performance Testing</h2>
          <Image 
            src="/images/perftest_article.png" 
            alt="LLM Inference Engines Performance Testing" 
            width={200}
            height={150}
            className="article-image"
          />
          <br />
          <p>This article discusses the performance testing of LLM inference engines, comparing SGLang and vLLM.</p>
          <a 
            href="https://medium.com/@occlubssk/llm-inference-engines-performance-testing-sglang-vs-vllm-cfd2a597852a" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Read the full article
          </a>
        </div>
      </div>
    </section>
  )
}