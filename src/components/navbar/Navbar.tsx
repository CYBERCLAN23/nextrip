'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { X, FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import './navbar.css';

// Academic Crest Emblem — Globe motif with compass lines
const CrestIcon = () => (
  <svg
    className="navbar-crest-icon"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
    <path d="M50 15 L50 85" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 50 L85 50" stroke="currentColor" strokeWidth="1.5" />
    <path d="M22 30 Q50 45 78 30" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M22 70 Q50 55 78 70" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M30 22 Q45 50 30 78" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M70 22 Q55 50 70 78" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M50 40 L54 50 L50 60 L46 50 Z" fill="currentColor" />
  </svg>
);

// Custom Menu Icon with descending lengths
const MenuIcon = () => (
  <svg
    width="18"
    height="12"
    viewBox="0 0 18 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="navbar-hamburger-svg"
  >
    <path d="M0 1.5 H18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M0 6 H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M0 10.5 H8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const LEFT_MENU_ITEMS = [
  { name: 'About', href: '#services' },
  { name: 'Learn', href: '#destinations' },
  { name: 'Co-curricular', href: '#journey' },
  { name: 'Enrolments', href: '#cta' },
  { name: 'Our community', href: '#testimonials' },
  { name: 'Resources', href: '#resources' },
] as const;

const SUB_MENUS: Record<string, ReadonlyArray<{ name: string; href: string }>> = {
  'About': [
    { name: 'Our School', href: '#services' },
    { name: 'Teaching Quality', href: '#destinations' },
    { name: 'Academic Results', href: '#journey' },
    { name: 'Student Wellbeing', href: '#cta' },
    { name: 'School Houses', href: '#testimonials' },
    { name: 'Campus & Facilities', href: '#resources' },
    { name: 'Leadership & Governance', href: '#faq' },
    { name: 'Employment', href: '#footer' },
  ],
  'Learn': [
    { name: 'Curriculum & Courses', href: '#services' },
    { name: 'Chinese Language', href: '#destinations' },
    { name: 'Study Programs', href: '#journey' },
    { name: 'Academic Advising', href: '#cta' },
    { name: 'Global Admissions', href: '#testimonials' },
    { name: 'English Preparation', href: '#resources' },
    { name: 'Visa Guidance', href: '#faq' },
    { name: 'Internships', href: '#footer' },
  ],
  'Co-curricular': [
    { name: 'Student Clubs', href: '#services' },
    { name: 'Sports Teams', href: '#destinations' },
    { name: 'Arts & Music', href: '#journey' },
    { name: 'Debate Society', href: '#cta' },
    { name: 'Creative Writing', href: '#testimonials' },
    { name: 'Voluntour', href: '#resources' },
    { name: 'Public Speaking', href: '#faq' },
    { name: 'Photography Club', href: '#footer' },
  ],
  'Enrolments': [
    { name: 'Admissions Process', href: '#services' },
    { name: 'Fee Structure', href: '#destinations' },
    { name: 'Payment Portal', href: '#journey' },
    { name: 'Application Forms', href: '#cta' },
    { name: 'Key Deadlines', href: '#testimonials' },
    { name: 'Scholarship Criteria', href: '#resources' },
    { name: 'Virtual Consultations', href: '#faq' },
    { name: 'Refund Policy', href: '#footer' },
  ],
  'Our community': [
    { name: 'Alumni Network', href: '#services' },
    { name: 'Student Stories', href: '#destinations' },
    { name: 'Parent Association', href: '#journey' },
    { name: 'Faculty Board', href: '#cta' },
    { name: 'Industry Mentors', href: '#testimonials' },
    { name: 'Partner Schools', href: '#resources' },
    { name: 'Nextrip Foundation', href: '#faq' },
    { name: 'Events Calendar', href: '#footer' },
  ],
  'Resources': [
    { name: 'Document Templates', href: '#services' },
    { name: 'Visa Checklist', href: '#destinations' },
    { name: 'Pre-Departure Guide', href: '#journey' },
    { name: 'Student Handbook', href: '#cta' },
    { name: 'Accommodation List', href: '#testimonials' },
    { name: 'Flight Partners', href: '#resources' },
    { name: 'FAQ Portal', href: '#faq' },
    { name: 'Contact Support', href: '#footer' },
  ],
};

const QUICK_LINKS = [
  { name: 'Contact Us', href: '#faq' },
  { name: 'Start Application', href: '#cta' },
  { name: 'Partner Universities', href: '#universities' },
  { name: 'Scholarship List', href: '#resources' },
  { name: 'Accommodation Guide', href: '#journey' },
  { name: 'Pre-Departure Portal', href: '#cta' },
  { name: 'Global Network', href: '#destinations' },
  { name: 'Careers', href: '#footer' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('About');
  const { resolved, toggle } = useTheme();

  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const ticking = useRef(false);

  const leftNavRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<SVGSVGElement>(null);

  // Mark as mounted to prevent hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── GSAP Entrance Animation for Header ──
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      }
    );
  }, []);

  // ── Scroll Direction Handler ──
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const nav = navRef.current;
      const THRESHOLD = 80;

      if (!nav || menuOpen) {
        ticking.current = false;
        return;
      }

      setScrolled(currentY > 30);

      if (currentY > THRESHOLD) {
        if (currentY > lastScrollY.current && !isHidden.current) {
          isHidden.current = true;
          gsap.to(nav, {
            y: -120,
            opacity: 0,
            duration: 0.45,
            ease: 'power3.in',
            overwrite: 'auto',
          });
        } else if (currentY < lastScrollY.current && isHidden.current) {
          isHidden.current = false;
          gsap.to(nav, {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      } else {
        if (isHidden.current) {
          isHidden.current = false;
          gsap.to(nav, {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
        setScrolled(false);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, [menuOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // ── GSAP Menu Animation ──
  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setMenuOpen(false);
        document.body.style.overflow = '';
      },
    });

    // Smooth exit animation
    tl.to('.menu-left-panel', { xPercent: -105, duration: 0.6, ease: 'power3.inOut' }, 0);
    tl.to('.menu-right-panel', { xPercent: 105, duration: 0.6, ease: 'power3.inOut' }, 0);
    tl.to('.navbar-drawer-overlay', { opacity: 0, duration: 0.5 }, 0.1);
  };

  // Entrance animations for menu panels and static elements
  useEffect(() => {
    if (!menuOpen) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Slid panels in
      tl.fromTo(
        '.menu-left-panel',
        { xPercent: -105 },
        { xPercent: 0, duration: 0.85, ease: 'power3.out' },
        0
      );
      tl.fromTo(
        '.menu-right-panel',
        { xPercent: 105 },
        { xPercent: 0, duration: 0.85, ease: 'power3.out' },
        0
      );

      // Stagger elements in Left Panel
      tl.fromTo(
        '.menu-left-brand, .menu-left-nav a, .menu-left-socials a',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.6, ease: 'power3.out' },
        0.3
      );

      // Stagger elements in Right Panel
      tl.fromTo(
        '.menu-right-header-item, .menu-quick-links-card, .menu-right-footer-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.6, ease: 'power3.out' },
        0.35
      );
    });

    return () => ctx.revert();
  }, [menuOpen]);

  // Pointer position update and sub-menu stagger
  const updatePointerPosition = useCallback((categoryName: string, instant = false) => {
    if (!pointerRef.current || !leftNavRef.current) return;

    const links = leftNavRef.current.querySelectorAll('.menu-left-link');
    let targetLink: HTMLElement | null = null;

    links.forEach((link) => {
      if ((link as HTMLElement).innerText.trim().toLowerCase() === categoryName.toLowerCase()) {
        targetLink = link as HTMLElement;
      }
    });

    const leftPanel = leftNavRef.current.closest('.menu-left-panel');

    if (targetLink && leftPanel) {
      const panelRect = leftPanel.getBoundingClientRect();
      const linkRect = (targetLink as HTMLElement).getBoundingClientRect();

      // Calculate link's center relative to panel scroll top (pointer height is 180px)
      const offsetTop = (linkRect.top - panelRect.top) + leftPanel.scrollTop + (linkRect.height / 2) - 90;

      gsap.to(pointerRef.current, {
        y: offsetTop,
        duration: instant ? 0 : 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  }, []);

  // Update pointer position whenever activeCategory or menuOpen state changes
  useEffect(() => {
    if (!menuOpen) return;

    // Run layout adjustments
    updatePointerPosition(activeCategory);

    // Stagger in new sub-menu items
    gsap.fromTo(
      '.menu-middle-nav a',
      { opacity: 0, x: -15 },
      {
        opacity: 0.85,
        x: 0,
        stagger: 0.035,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      }
    );
  }, [activeCategory, menuOpen, updatePointerPosition]);

  // Handle pointer update on window resize
  useEffect(() => {
    if (!menuOpen) return;

    const handleResize = () => {
      updatePointerPosition(activeCategory, true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen, activeCategory, updatePointerPosition]);

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar-header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-active' : ''}`}
        data-navbar="true"
        style={{ opacity: 0, transform: 'translateY(-120px)' }}
      >
        <div className="navbar-container">
          {/* Logo: Crest + Wordmark */}
          <div
            className="navbar-brand"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              closeMenu();
            }}
            data-navbar-logo="true"
          >
            <CrestIcon />
            <span className="navbar-logo-text">NEXTRIP</span>
          </div>

          {/* Right side: Tour link + pill button group */}
          <div className="navbar-right-menu">
            <a href="#destinations" className="navbar-tour-link">
              TOUR NEXTRIP
            </a>

            {/* Dual Pill: Enquire + Menu */}
            <div className="navbar-pill-group">
              <a href="#cta" className="navbar-enquire-btn">
                ENQUIRE
              </a>
              <button
                onClick={openMenu}
                className="navbar-menu-btn"
                aria-label="Open navigation menu"
              >
                <MenuIcon />
                <span className="navbar-menu-text">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── High-Fidelity Custom Drawer Overlay ── */}
      {menuOpen && (
        <div className="navbar-drawer-overlay" onClick={closeMenu}>
          <div className="menu-container" onClick={(e) => e.stopPropagation()}>
            
            {/* 1. Left Panel (Cream Background) */}
            <div className="menu-left-panel">
              <div className="menu-left-content">
                {/* Logo */}
                <div className="menu-left-brand">
                  <CrestIcon />
                  <span className="menu-logo-text">NEXTRIP</span>
                </div>

                {/* Vertical Navigation Stack */}
                <nav ref={leftNavRef} className="menu-left-nav">
                  {LEFT_MENU_ITEMS.map((item) => (
                    <button
                      key={item.name}
                      className={`menu-left-link ${activeCategory === item.name ? 'active' : ''}`}
                      onClick={() => setActiveCategory(item.name)}
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>

                {/* Social Links */}
                <div className="menu-left-socials">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FacebookLogo size={24} weight="fill" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <InstagramLogo size={24} weight="fill" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <LinkedinLogo size={24} weight="fill" />
                  </a>
                </div>
              </div>

              {/* Dynamic SVG Wave Pointer aligned to active item center */}
              <svg
                ref={pointerRef}
                className="menu-wave-pointer"
                viewBox="0 0 30 180"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0 C 0 30, 10 60, 30 90 C 10 120, 0 150, 0 180 Z" fill="#F7F4EF" />
              </svg>
            </div>

            {/* 2. Right Panel (Burgundy Background) */}
            <div className="menu-right-panel">
              <div className="menu-right-content">
                {/* Top Action Row */}
                <div className="menu-right-header">
                  {/* Search Input */}
                  <div className="menu-right-header-item menu-search-container">
                    <input
                      type="text"
                      placeholder="SEARCH"
                      className="menu-search-input"
                    />
                    <span className="menu-search-arrow">→</span>
                  </div>

                  <a href="#destinations" className="menu-right-header-item menu-right-tour-link" onClick={closeMenu}>
                    TOUR NEXTRIP
                  </a>

                  <a href="#cta" className="menu-right-header-item menu-right-enquire-btn" onClick={closeMenu}>
                    ENQUIRE
                  </a>

                  <button className="menu-right-header-item menu-right-close-btn" onClick={closeMenu}>
                    <X size={18} weight="bold" />
                    <span>CLOSE</span>
                  </button>
                </div>

                {/* Main Body Columns */}
                <div className="menu-right-body">
                  {/* Middle Column: Dynamic Sub-menu Links */}
                  <div className="menu-middle-nav">
                    {SUB_MENUS[activeCategory]?.map((item) => (
                      <a key={item.name} href={item.href} onClick={closeMenu}>
                        {item.name}
                      </a>
                    ))}
                  </div>

                  {/* Right Column: Quick Links Card */}
                  <div className="menu-quick-links-card">
                    <div className="menu-quick-links-title">
                      <span>★</span> QUICK LINKS
                    </div>
                    <div className="menu-quick-links-grid">
                      {QUICK_LINKS.map((item) => (
                        <a key={item.name} href={item.href} onClick={closeMenu}>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="menu-right-footer">
                  <span className="menu-right-footer-item">
                    NexTrip Global Limited
                  </span>
                  <span className="menu-right-footer-item">
                    ★ 10-16 Ranfurlie Cres, Glen Iris VIC 3146
                  </span>
                  <span className="menu-right-footer-item">
                    ★ +61 3 8808 8888
                  </span>

                  {mounted && (
                    <button
                      onClick={toggle}
                      className="menu-right-footer-item menu-theme-toggle-btn"
                      aria-label="Toggle theme"
                    >
                      {resolved === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;