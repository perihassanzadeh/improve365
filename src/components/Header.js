import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1.5rem 3rem;
  background: rgba(43, 43, 74, 0.85);
  backdrop-filter: blur(12px) saturate(1.2);
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.medium};
  box-shadow: 0 8px 32px rgba(108,99,255,0.10), 0 1.5px 8px rgba(0,0,0,0.10);
  min-height: 80px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 2.7rem;
  font-weight: 800;
  letter-spacing: 2.5px;
  background: ${({ theme }) => theme.colors.gradients.primaryAccent};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 12px rgba(108,99,255,0.18);
  cursor: pointer;
  user-select: none;
`;

const MenuButton = styled.button`
  background: ${({ theme }) => theme.colors.gradients.primaryAccent};
  color: ${({ theme }) => theme.colors.text.heading};
  border: none;
  border-radius: ${({ theme }) => theme.global.borderRadius};
  font-size: 2rem;
  font-weight: 700;
  padding: 0.5rem 1.5rem;
  margin-right: 2rem;
  box-shadow: 0 2px 12px rgba(108,99,255,0.10);
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
  cursor: pointer;
  &:hover, &:focus {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 24px rgba(108,99,255,0.18);
    background: ${({ theme }) => theme.colors.accent.secondary};
  }
`;

const Spacer = styled.div`
  flex: 1 1 auto;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.accent.primary};
  box-shadow: 0 0 0 4px rgba(108,99,255,0.10);
  object-fit: cover;
  cursor: pointer;
  margin-left: 1.5rem;
  transition: box-shadow 0.18s;
  &:hover, &:focus {
    box-shadow: 0 0 0 8px rgba(108,99,255,0.18);
  }
`;

const Header = ({ onMenuClick, profilePic }) => {
  return (
    <HeaderBar>
      <MenuButton aria-label="Open menu" onClick={onMenuClick}>
        &#9776;
      </MenuButton>
      <Logo>GymApp</Logo>
      <Spacer />
      <Link to="/profile" tabIndex={-1} style={{ display: 'flex', alignItems: 'center' }}>
        <ProfilePic src={profilePic} alt="Profile" />
      </Link>
    </HeaderBar>
  );
};

export default Header; 