import Image from "next/image"
import HomeContent from "@/components/HomeContent"

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="profile-image">
              <Image 
                src="/images/profile_picture.jpg" 
                alt="Chirawat Chitpakdee"
                width={180}
                height={180}
                priority
              />
            </div>
            <div className="hero-text">
              <h1>Chirawat Chitpakdee</h1>
              <p>AI Workflow Engineer, CP Axtra Technology Lead</p>
            </div>
          </div>
          <div className="contact-info">
            <div className="contact-item">
              <i className="contact-icon fas fa-graduation-cap"></i>
              <div>
                <span>I&apos;m Expert in:</span>
                <p>AI & Automation workflow</p>
                <p>Performance Testing</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="contact-icon fas fa-phone-alt"></i>
              <div>
                <span>Phone</span>
                <p>(+66) 087-400-4666</p>
              </div>
            </div>
            <div className="contact-item">
              <a href="mailto:chirawat.ch@ku.th">
                <i className="contact-icon fas fa-address-card"></i>
                <div>
                  <span>Contact Me:</span>
                  <p>chirawat.ch@ku.th</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="resume-content">
        <div className="container">
          <HomeContent />
        </div>
      </section>
    </>
  )
}
