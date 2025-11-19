export default function Education() {
  return (
    <section className="resume-content">
      <div className="container">
        <div className="card">
          <div className="section-header">
            <i className="fas fa-graduation-cap section-icon"></i>
            <h2 className="card-title" style={{ marginBottom: 0 }}>Education</h2>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ marginBottom: '2rem', paddingLeft: '1rem', borderLeft: '4px solid var(--gradient-end)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <i className="fas fa-certificate" style={{ color: 'var(--gradient-end)', fontSize: '1.2rem' }}></i>
                <p style={{ margin: 0 }}><strong style={{ color: 'var(--gradient-start)' }}>IELTS Academic Score:</strong> <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--gradient-end)' }}>6.0</span></p>
              </div>
            </div>

            <div style={{ marginBottom: '2rem', paddingLeft: '1rem', borderLeft: '4px solid var(--gradient-end)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '0.5rem' }}>
                <i className="fas fa-university" style={{ color: 'var(--gradient-end)', fontSize: '1.2rem', marginTop: '4px' }}></i>
                <div>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'var(--gradient-start)' }}>M.Sc., Physical Chemistry</p>
                  <p style={{ margin: '0.25rem 0', color: 'var(--secondary-text-color)' }}>Kasetsart University, Bangkok</p>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '0.5rem' }}>
                    <span className="info-badge" style={{ padding: '4px 10px', margin: 0 }}>
                      <i className="fas fa-calendar"></i>
                      2011
                    </span>
                    <span className="info-badge" style={{ padding: '4px 10px', margin: 0 }}>
                      <i className="fas fa-award"></i>
                      GPA 3.41
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ paddingLeft: '1rem', borderLeft: '4px solid var(--gradient-end)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <i className="fas fa-university" style={{ color: 'var(--gradient-end)', fontSize: '1.2rem', marginTop: '4px' }}></i>
                <div>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'var(--gradient-start)' }}>B.Sc., Chemistry</p>
                  <p style={{ margin: '0.25rem 0', color: 'var(--secondary-text-color)' }}>Ubon Ratchathani University, Ubon Ratchathani</p>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '0.5rem' }}>
                    <span className="info-badge" style={{ padding: '4px 10px', margin: 0 }}>
                      <i className="fas fa-calendar"></i>
                      2009
                    </span>
                    <span className="info-badge" style={{ padding: '4px 10px', margin: 0 }}>
                      <i className="fas fa-award"></i>
                      GPA 3.05
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}