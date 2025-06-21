import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(43, 43, 74, 0.95) 100%);
  backdrop-filter: blur(20px) saturate(1.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 70px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #6C63FF 0%, #8A83FF 50%, #A594F9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 8px rgba(108, 99, 255, 0.15);
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    text-shadow: 0 4px 12px rgba(108, 99, 255, 0.25);
  }
`;

const MenuButton = styled.button`
  background: rgba(108, 99, 255, 0.1);
  color: #6C63FF;
  border: 1px solid rgba(108, 99, 255, 0.2);
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  box-shadow: 0 2px 8px rgba(108, 99, 255, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover, &:focus {
    background: rgba(108, 99, 255, 0.15);
    border-color: rgba(108, 99, 255, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(108, 99, 255, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ProfilePic = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid rgba(108, 99, 255, 0.3);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  object-fit: cover;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover, &:focus {
    border-color: rgba(108, 99, 255, 0.5);
    transform: scale(1.05);
    box-shadow: 
      0 4px 16px rgba(108, 99, 255, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.15);
  }
`;

const Header = ({ onMenuClick, profilePic }) => {
  return (
    <HeaderBar>
      <LeftSection>
        <MenuButton aria-label="Open menu" onClick={onMenuClick}>
          ☰
        </MenuButton>
        <Logo>Improve365</Logo>
      </LeftSection>
      
      <RightSection>
        <Link to="/profile" tabIndex={-1} style={{ display: 'flex', alignItems: 'center' }}>
          <ProfilePic src={profilePic} alt="Profile" />
        </Link>
      </RightSection>
    </HeaderBar>
  );
};

export default Header; 