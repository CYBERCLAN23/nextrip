'use client'

import React from 'react'
import Link from 'next/link'
import './footer.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" aria-label="Site Footer">
      <div className="footer__container">
        
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              Nex<span>Trip</span>
            </Link>
            <p className="footer__desc">
              Empowering students worldwide to achieve their global education dreams through expert guidance, trusted partnerships, and end-to-end support.
            </p>
          </div>

          {/* Column 1 */}
          <div className="footer__col">
            <h3 className="footer__col-title">Destinations</h3>
            <ul className="footer__links">
              <li><Link href="/destinations/canada" className="footer__link">Study in Canada</Link></li>
              <li><Link href="/destinations/uk" className="footer__link">Study in UK</Link></li>
              <li><Link href="/destinations/usa" className="footer__link">Study in USA</Link></li>
              <li><Link href="/destinations/australia" className="footer__link">Study in Australia</Link></li>
              <li><Link href="/destinations/europe" className="footer__link">Study in Europe</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer__col">
            <h3 className="footer__col-title">Services</h3>
            <ul className="footer__links">
              <li><Link href="/services/admissions" className="footer__link">University Admissions</Link></li>
              <li><Link href="/services/visa" className="footer__link">Visa Assistance</Link></li>
              <li><Link href="/services/scholarships" className="footer__link">Scholarships</Link></li>
              <li><Link href="/services/accommodation" className="footer__link">Accommodation</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer__col">
            <h3 className="footer__col-title">Company</h3>
            <ul className="footer__links">
              <li><Link href="/about" className="footer__link">About Us</Link></li>
              <li><Link href="/success-stories" className="footer__link">Success Stories</Link></li>
              <li><Link href="/contact" className="footer__link">Contact</Link></li>
              <li><Link href="/careers" className="footer__link">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {currentYear} NexTrip Education. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
