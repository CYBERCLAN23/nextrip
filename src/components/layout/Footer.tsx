'use client'

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { TwitterLogo, LinkedinLogo, WhatsappLogo } from '@phosphor-icons/react';
import { animate } from 'animejs';

const Footer = () => {
  const footerLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const links = footerLinksRef.current?.querySelectorAll('.footer-link');

    if (links) {
      links.forEach((link) => {
        const handleMouseEnter = () => {
          animate(link, {
            translateX: 4,
            duration: 300,
            easing: 'easeOutQuad',
            color: '#7fa5d8'
          });
        };

        const handleMouseLeave = () => {
          animate(link, {
            translateX: 0,
            duration: 300,
            easing: 'easeOutQuad',
            color: '#cdd1de'
          });
        };

        link.addEventListener('mouseenter', handleMouseEnter);
        link.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          link.removeEventListener('mouseenter', handleMouseEnter);
          link.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    }
  }, []);

  return (
    <footer className="relative bg-[var(--color-rr-ink)] pt-24 pb-12 overflow-hidden">
      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      {/* Porcelain Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-rr-blue)] to-transparent opacity-60" />

      {/* Decorative supergraphic */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-6 font-display text-[14rem] leading-none text-white/[0.04] pointer-events-none select-none"
      >
        途
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-3 mb-6 font-registry-mono">
            <span className="live-dot" />
            <span className="text-[var(--color-rr-blue)] text-xs tracking-[0.3em]">FILE NO. 2026-CN-001 — OPEN</span>
          </div>
          <h2 className="font-registry-display text-4xl md:text-6xl lg:text-7xl text-[var(--color-rr-paper)] font-bold tracking-tight mb-6">
            NexTrip <span className="text-[var(--color-rr-blue)] font-light italic">Global</span>
          </h2>
          <p className="text-[var(--color-rr-paper)]/60 text-base md:text-lg max-w-2xl font-light leading-relaxed font-registry">
            Your documented route to China's universities — every scholarship, every
            admission, every departure entered into the registry.
          </p>
        </div>

        {/* Stats Row — registry entries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 py-10 border-y rr-line">
          <div className="text-center">
            <h4 className="text-4xl font-registry-display text-[var(--color-rr-blue)] font-bold mb-2">2,000+</h4>
            <p className="rr-label text-[var(--color-rr-paper)]/60">Students placed</p>
          </div>
          <div className="text-center md:border-x rr-line">
            <h4 className="text-4xl font-registry-display text-[var(--color-rr-blue)] font-bold mb-2">40+</h4>
            <p className="rr-label text-[var(--color-rr-paper)]/60">Hubs reached</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-registry-display text-[var(--color-rr-blue)] font-bold mb-2">95%</h4>
            <p className="rr-label text-[var(--color-rr-paper)]/60">Files sealed</p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20" ref={footerLinksRef}>

          {/* Brand & Social Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <div className="flex items-center justify-center border-2 border-[var(--color-rr-blue)] px-2.5 h-12 group-hover:bg-[var(--color-rr-blue)] transition-colors duration-300">
                <span className="text-[var(--color-rr-blue)] font-registry-display font-bold text-xl group-hover:text-[var(--color-rr-ink)] transition-colors duration-300">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-registry-display font-bold text-[var(--color-rr-paper)] tracking-widest leading-none text-xl">NEXTRIP</span>
                <span className="text-[var(--color-rr-blue)] font-registry-mono text-[10px] tracking-[0.3em] leading-none mt-1">GLOBAL · REGISTRY</span>
              </div>
            </Link>
            <p className="text-[var(--color-rr-paper)]/60 text-sm mb-8 max-w-sm leading-relaxed font-registry">
              We enter international students into the China registry — scholarships,
              admissions, and a clear line to departure.
            </p>

            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className="w-10 h-10 border border-[var(--color-rr-paper)]/20 flex items-center justify-center text-[var(--color-rr-paper)] hover:bg-[var(--color-rr-blue)] hover:text-[var(--color-rr-ink)] hover:border-[var(--color-rr-blue)] transition-all duration-300">
                <TwitterLogo weight="fill" size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 border border-[var(--color-rr-paper)]/20 flex items-center justify-center text-[var(--color-rr-paper)] hover:bg-[var(--color-rr-blue)] hover:text-[var(--color-rr-ink)] hover:border-[var(--color-rr-blue)] transition-all duration-300">
                <LinkedinLogo weight="fill" size={20} />
              </a>
              <a href="#" aria-label="WhatsApp" className="w-10 h-10 border border-[var(--color-rr-paper)]/20 flex items-center justify-center text-[var(--color-rr-paper)] hover:bg-[var(--color-rr-blue)] hover:text-[var(--color-rr-ink)] hover:border-[var(--color-rr-blue)] transition-all duration-300">
                <WhatsappLogo weight="fill" size={20} />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          <div>
            <h4 className="text-[var(--color-rr-paper)] font-semibold mb-6 tracking-wide text-sm font-registry">DESTINATIONS</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/destinations/china" className="footer-link inline-block text-[var(--color-rr-paper)]/80 text-sm font-registry">China</Link>
              </li>
              <li>
                <div className="inline-flex items-center gap-2">
                  <span className="text-[var(--color-rr-paper)]/40 text-sm cursor-not-allowed font-registry">Canada</span>
                  <span className="text-[9px] uppercase tracking-wider bg-white/5 text-white/50 px-2 py-0.5 border border-white/10 font-registry-mono">Soon</span>
                </div>
              </li>
              <li>
                <div className="inline-flex items-center gap-2">
                  <span className="text-[var(--color-rr-paper)]/40 text-sm cursor-not-allowed font-registry">Germany</span>
                  <span className="text-[9px] uppercase tracking-wider bg-white/5 text-white/50 px-2 py-0.5 border border-white/10 font-registry-mono">Soon</span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-rr-paper)] font-semibold mb-6 tracking-wide text-sm font-registry">SERVICES</h4>
            <ul className="space-y-4">
              <li><Link href="/admissions" className="footer-link inline-block text-[var(--color-rr-paper)]/80 text-sm font-registry">Admissions</Link></li>
              <li><Link href="/scholarships" className="footer-link inline-block text-[var(--color-rr-paper)]/80 text-sm font-registry">Scholarships</Link></li>
              <li><Link href="/universities" className="footer-link inline-block text-[var(--color-rr-paper)]/80 text-sm font-registry">Universities</Link></li>
              <li><Link href="/rankings" className="footer-link inline-block text-[var(--color-rr-paper)]/80 text-sm font-registry">Specialty Rankings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-rr-paper)] font-semibold mb-6 tracking-wide text-sm font-registry">COMPANY</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="footer-link inline-block text-[var(--color-rr-paper)]/80 text-sm font-registry">About Us</Link></li>
              <li><Link href="/blog" className="footer-link inline-block text-[var(--color-rr-paper)]/80 text-sm font-registry">Journal & News</Link></li>
              <li><Link href="/faq" className="footer-link inline-block text-[var(--color-rr-paper)]/80 text-sm font-registry">FAQ</Link></li>
              <li><Link href="/testimonials" className="footer-link inline-block text-[var(--color-rr-paper)]/80 text-sm font-registry">Testimonials</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Contact */}
        <div className="flex flex-col md:flex-row justify-between items-center p-8 border border-[var(--color-rr-paper)]/12 mb-12">
          <div className="mb-6 md:mb-0 md:mr-8 max-w-md">
            <h4 className="text-[var(--color-rr-paper)] font-semibold mb-2 font-registry">Subscribe to the filing brief</h4>
            <p className="text-[var(--color-rr-paper)]/60 text-sm font-registry">New scholarship calls, admission deadlines, and registry updates — one brief a week.</p>
          </div>
          <form className="flex w-full md:w-auto relative" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full md:w-[300px] bg-[var(--color-rr-night)] border border-[var(--color-rr-paper)]/20 text-[var(--color-rr-paper)] px-5 py-3 text-sm focus:outline-none focus:border-[var(--color-rr-blue)] transition-colors pr-32 font-registry"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-6 bg-[var(--color-rr-blue)] text-white font-bold text-sm hover:bg-[var(--color-rr-blue-deep)] transition-colors font-registry"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t rr-line flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-rr-paper)]/50 text-xs text-center md:text-left font-registry-mono">
            © {new Date().getFullYear()} NexTrip Global Limited. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            <Link href="/privacy" className="text-[var(--color-rr-paper)]/50 hover:text-[var(--color-rr-blue)] text-xs transition-colors font-registry">Privacy Policy</Link>
            <Link href="/terms" className="text-[var(--color-rr-paper)]/50 hover:text-[var(--color-rr-blue)] text-xs transition-colors font-registry">Terms of Service</Link>
            <div className="w-px h-3 bg-[var(--color-rr-paper)]/20"></div>
            <button className="text-[var(--color-rr-paper)]/50 hover:text-[var(--color-rr-blue)] text-xs transition-colors flex items-center gap-1 font-registry-mono">
              EN <ArrowUpRight size={10} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
