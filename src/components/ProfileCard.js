import React from 'react';
import styled, { useTheme } from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.gradients.subtleBackground};
  border-radius: ${({ theme }) => theme.global.borderRadius};
  box-shadow: 0 8px 32px rgba(108,99,255,0.18), 0 1.5px 8px rgba(0,0,0,0.12);
  padding: 2.5rem;
  margin: 2rem 0;
  border: 1.5px solid ${({ theme }) => theme.colors.border.medium};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(108,99,255,0.08) 0%, rgba(138,131,255,0.04) 100%);
    z-index: 0;
    pointer-events: none;
  }
`;

const ProfilePic = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2.5px solid ${({ theme }) => theme.colors.accent.primary};
  box-shadow: 0 0 0 6px rgba(108,99,255,0.12), 0 8px 32px rgba(0,0,0,0.18);
  transition: box-shadow 0.2s;
  margin-bottom: 1.5rem;
  z-index: 1;
  background: ${({ theme }) => theme.colors.background.tertiary};
  &:hover {
    box-shadow: 0 0 0 12px rgba(108,99,255,0.18), 0 12px 48px rgba(0,0,0,0.22);
  }
`;

const Name = styled.h2`
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.text.heading};
  margin: 0.5rem 0 0.2rem 0;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 12px rgba(108,99,255,0.12);
  z-index: 1;
`;

const Meta = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  margin-bottom: 1.2rem;
  z-index: 1;
`;

const Metrics = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 1.5rem;
  z-index: 1;
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.1rem;
  font-weight: 500;
  span {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.accent.primary};
    text-shadow: 0 1px 8px rgba(108,99,255,0.18);
  }
`;

const ProfileCard = ({ name, profilePic, streak, joinDate, weight, height }) => {
  return (
    <Card>
      <ProfilePic src={profilePic} alt={name} />
      <Name>{name}</Name>
      <Meta>Joined: {joinDate}</Meta>
      <Metrics>
        <Metric><span>{streak}</span> day streak</Metric>
        <Metric><span>{weight}</span> kg</Metric>
        <Metric><span>{height}</span> cm</Metric>
      </Metrics>
    </Card>
  );
};

export default ProfileCard; 