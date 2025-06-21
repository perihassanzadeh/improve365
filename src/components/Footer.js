import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.footer`
  width: 100%;
  background: var(--bg-secondary, #2B2B4A);
  color: var(--text-secondary, #B0B0D0);
  padding: 2rem 0 1.2rem 0;
  text-align: center;
  font-size: 1rem;
  border-top: 1px solid var(--border-medium, rgba(255,255,255,0.2));
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

const FooterTop = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  justify-content: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  svg {
    width: 100%;
    height: 100%;
    stroke: var(--accent-primary, #6C63FF);
    transition: stroke 0.18s;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  a {
    color: var(--accent-primary, #6C63FF);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.18s;
    &:hover, &:focus {
      color: var(--accent-secondary, #8A83FF);
      text-decoration: underline;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.2rem;
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-primary, #6C63FF);
    transition: color 0.18s;
    font-size: 1.5rem;
    &:hover, &:focus {
      color: var(--accent-secondary, #8A83FF);
    }
    svg {
      width: 28px;
      height: 28px;
      stroke: currentColor;
      fill: none;
    }
  }
`;

export default function Footer() {
  return (
    <FooterBar>
      <FooterContent>
        <FooterTop>
          <Logo>
            {/* Provided SVG, adapted for accent color and size */}
            <svg viewBox="0 0 500 500" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M250 250 L250 250" fill="none" stroke="var(--accent-primary, #6C63FF)" strokeWidth="2"/>
              <path d="M200 250 L200 250" fill="none" stroke="var(--accent-primary, #6C63FF)" strokeWidth="2"/>

              <path d="M150 250 C180 200, 320 200, 350 250 C380 300, 320 350, 250 350 C180 350, 120 300, 150 250 Z" fill="var(--accent-primary, #6C63FF)"/>

              <path d="M350 250 C380 230, 400 200, 390 170 C380 140, 350 130, 320 140 C290 150, 300 190, 320 210 L350 250 Z" fill="var(--accent-primary, #6C63FF)"/>

              <path d="M385 165 C390 155, 395 150, 395 145 C390 140, 380 140, 385 165 Z" fill="var(--accent-primary, #6C63FF)"/>

              <path d="M280 210 C300 160, 350 120, 400 100 C420 90, 430 110, 400 130 C370 150, 320 170, 280 210 Z" fill="var(--accent-primary, #6C63FF)"/>
              <path d="M290 215 C310 175, 350 150, 390 140 C410 135, 420 145, 390 160 C360 175, 320 195, 290 215 Z" fill="var(--accent-primary, #6C63FF)"/>
              <path d="M300 220 C320 190, 350 170, 380 160 C400 155, 410 160, 380 175 C350 190, 320 205, 300 220 Z" fill="var(--accent-primary, #6C63FF)"/>
              <path d="M310 225 C330 205, 350 190, 370 180 C390 175, 400 180, 370 195 C340 210, 320 220, 310 225 Z" fill="var(--accent-primary, #6C63FF)"/>
              <path d="M320 230 C340 215, 350 205, 360 198 C370 195, 375 200, 360 210 C345 220, 330 225, 320 230 Z" fill="var(--accent-primary, #6C63FF)"/>

              <path d="M200 340 L190 380 L180 380 L190 340 Z" fill="var(--accent-primary, #6C63FF)"/>
              <path d="M220 340 L210 380 L200 380 L210 340 Z" fill="var(--accent-primary, #6C63FF)"/>
              <path d="M280 340 L270 380 L260 380 L270 340 Z" fill="var(--accent-primary, #6C63FF)"/>
              <path d="M300 340 L290 380 L280 380 L290 340 Z" fill="var(--accent-primary, #6C63FF)"/>

              <line x1="150" y1="390" x2="350" y2="390" stroke="var(--accent-primary, #6C63FF)" strokeWidth="5"/>
            </svg>
          </Logo>
          <FooterLinks>
            <a href="/privacy" tabIndex={0}>Privacy</a>
            <a href="/terms" tabIndex={0}>Terms</a>
            <a href="mailto:contact@yourapp.com" tabIndex={0}>Contact</a>
          </FooterLinks>
          <SocialIcons>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><path d="M22 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21.4 4.1a8.19 8.19 0 0 1-2.6.99A4.11 4.11 0 0 0 12 8.09c0 .32.04.64.1.94A11.65 11.65 0 0 1 3.1 4.6a4.07 4.07 0 0 0-.56 2.07c0 1.43.73 2.69 1.85 3.43a4.07 4.07 0 0 1-1.86-.51v.05c0 2 1.42 3.66 3.3 4.04a4.1 4.1 0 0 1-1.85.07c.52 1.62 2.03 2.8 3.82 2.83A8.24 8.24 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 5.92Z" /></svg>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17" cy="7" r="1.5" /></svg>
            </a>
          </SocialIcons>
        </FooterTop>
        <div>&copy; {new Date().getFullYear()} Improve365. All rights reserved.</div>
      </FooterContent>
    </FooterBar>
  );
} 