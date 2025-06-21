import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.form`
  background: ${({ theme }) => theme.colors.gradients.subtleBackground};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.global.borderRadius};
  margin: 1.5rem 0;
  box-shadow: 0 8px 32px rgba(108,99,255,0.10), 0 1.5px 8px rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1.5px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.global.borderRadius};
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
  transition: border 0.18s, box-shadow 0.18s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent.primary}33;
    outline: none;
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.gradients.primaryAccent};
  color: ${({ theme }) => theme.colors.text.heading};
  border: none;
  border-radius: ${({ theme }) => theme.global.borderRadius};
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.7rem 2rem;
  box-shadow: 0 2px 12px rgba(108,99,255,0.10);
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
  cursor: pointer;
  &:hover, &:focus {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 24px rgba(108,99,255,0.18);
    background: ${({ theme }) => theme.colors.accent.secondary};
  }
`;

const NutritionEntry = ({ onSubmit }) => {
  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (meal && calories) {
      onSubmit({ meal, calories });
      setMeal('');
      setCalories('');
    }
  };
  return (
    <Card onSubmit={handleSubmit}>
      <Row>
        <Input
          type="text"
          placeholder="Meal"
          value={meal}
          onChange={e => setMeal(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={e => setCalories(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </Row>
    </Card>
  );
};

export default NutritionEntry; 