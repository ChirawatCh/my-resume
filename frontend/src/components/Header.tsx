'use client'

import { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/education', label: 'Education' },
    { href: '/skills', label: 'Skills' },
    { href: '/projects', label: 'Projects' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/articles', label: 'Articles' },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            Chirawat C.
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-extra">
            <button 
              className="btn-lets-talk" 
              onClick={() => {
                // This will be handled by the Chatbot component
                const event = new CustomEvent('openChat')
                window.dispatchEvent(event)
              }}
            >
              Let&apos;s Talk
            </button>
            <button 
              className="hamburger-menu" 
              onClick={toggleMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header