import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.gradients.primaryAccent};
  color: ${({ theme }) => theme.colors.text.heading};
  padding: 1.5rem 2.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1.5rem 0;
  box-shadow: 0 8px 32px rgba(108,99,255,0.18), 0 1.5px 8px rgba(0,0,0,0.12);
  border: 2px solid ${({ theme }) => theme.colors.accent.primary};
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.accent.secondary};
  text-shadow: 0 2px 12px rgba(108,99,255,0.12);
`;

const Value = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: #FFD700;
  text-shadow: 0 0 8px #FFD700cc, 0 0 2px ${({ theme }) => theme.colors.text.heading};
  margin-left: 0.5rem;
  position: relative;
  &::after {
    content: '\2605';
    color: #FFD700;
    font-size: 1.1rem;
    margin-left: 0.3rem;
    filter: drop-shadow(0 0 4px #FFD700);
  }
`;

const StreakDisplay = ({ streak }) => (
  <Container>
    <Label>Current Streak</Label>
    <Value>{streak}</Value>
  </Container>
);

export default StreakDisplay; 