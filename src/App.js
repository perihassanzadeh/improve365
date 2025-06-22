import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import clayTheme from './theme/clayTheme';
import { Header, StreakDisplay, WorkoutForm, NutritionEntry, ProfileCard } from './components';
import NutritionHistory from './components/NutritionHistory';
import ExerciseHistory from './components/ExerciseHistory';
import { AppProvider, useApp } from './context/AppContext';
import styles from './App.module.css';
import styled, { keyframes } from 'styled-components';
import Footer from './components/Footer';
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";

const DEFAULT_PROFILE_PIC = "https://api.dicebear.com/9.x/shapes/svg?seed=Christian";

const Dashboard = ({ streak }) => {
  const { profile } = useAuth();
  return (
    <div className={styles.page}>
      <StreakDisplay streak={streak} />
      <WorkoutForm onSubmit={() => {}} />
      <NutritionEntry onSubmit={() => {}} />
      <div style={{marginTop: '2rem', fontSize: '1.2rem', color: '#8A83FF'}}>
        Welcome, {profile?.name || "User"}!
      </div>
    </div>
  );
};

const Profile = () => {
  const { currentStreak } = useApp();
  const { profile, user } = useAuth();
  return (
    <div className={styles.page}>
      <ProfileCard 
        name={profile?.name || "User"} 
        profilePic={profile?.profilePic || user.profilePic || DEFAULT_PROFILE_PIC} 
        streak={currentStreak} 
        joinDate={profile?.joinDate || undefined} 
        weight={profile?.weight || undefined} 
        height={profile?.height || undefined} 
      />
    </div>
  );
};

// Shimmer animation for icons
const shimmer = keyframes`
  0% { filter: drop-shadow(0 0 0px #fff) brightness(1); }
  50% { filter: drop-shadow(0 0 8px #fff) brightness(1.2); }
  100% { filter: drop-shadow(0 0 0px #fff) brightness(1); }
`;

const AnimatedIcon = styled.span`
  display: flex;
  align-items: center;
  svg {
    animation: ${shimmer} 2.2s infinite;
    animation-delay: ${({ delay }) => delay || '0s'};
  }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(26, 26, 46, 0.25);
  backdrop-filter: blur(6px) saturate(1.2);
  z-index: 1999;
  transition: opacity 0.2s;
`;

const Menu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background: rgba(43, 43, 74, 0.92);
  border-right: 2px solid ${({ theme }) => theme.colors.border.medium};
  box-shadow: 0 8px 32px rgba(108,99,255,0.18), 0 1.5px 8px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  padding-top: 90px;
  animation: ${({ $closing }) => $closing ? slideOut : slideIn} 0.2s cubic-bezier(.4,2,.6,1) forwards;
  border-radius: 0 2rem 2rem 0;
  z-index: 2000;
  overflow: hidden;
  @media (max-width: 600px) {
    width: 90vw;
    min-width: 0;
    padding-top: 70px;
    border-radius: 0 1.2rem 1.2rem 0;
  }
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: ${({ theme }) => theme.colors.accent.primary};
  background: none;
  text-decoration: none;
  padding: 1.1rem 2rem;
  font-weight: 700;
  font-size: 1.15rem;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: 0;
  letter-spacing: 0.03em;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  position: relative;
  z-index: 2;
  &:last-child { border-bottom: none; }
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.gradients.primaryAccent};
    color: ${({ theme }) => theme.colors.text.heading};
    transform: scale(1.04) translateX(4px);
    svg path, svg ellipse, svg rect, svg circle {
      stroke: ${({ theme }) => theme.colors.text.heading};
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: ${({ theme }) => theme.colors.gradients.primaryAccent};
  color: ${({ theme }) => theme.colors.text.heading};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  font-weight: 700;
  box-shadow: 0 2px 12px rgba(108,99,255,0.10);
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.accent.secondary};
    color: ${({ theme }) => theme.colors.text.heading};
    box-shadow: 0 6px 24px rgba(108,99,255,0.18);
  }
`;

// SVG ICONS
const HomeIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 11.5L12 4l9 7.5" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21V14h6v7" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 21H3" stroke="#8A83FF" strokeWidth="2" strokeLinecap="round"/></svg>
);
const NutritionIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="7" stroke="#6C63FF" strokeWidth="2"/><ellipse cx="12" cy="12" rx="5" ry="3" stroke="#8A83FF" strokeWidth="2"/><path d="M12 9v6" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round"/></svg>
);
const ExerciseIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="4" rx="2" stroke="#6C63FF" strokeWidth="2"/><rect x="9" y="4" width="6" height="16" rx="2" stroke="#8A83FF" strokeWidth="2"/></svg>
);
const ProfileIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#6C63FF" strokeWidth="2"/><ellipse cx="12" cy="17" rx="7" ry="4" stroke="#8A83FF" strokeWidth="2"/></svg>
);

// --- New Styled Components for Home Page ---
const GreetingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;
const GreetingText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.heading};
`;
const StreakBadge = styled.div`
  background: ${({ theme }) => theme.colors.gradients.primaryAccent};
  color: #FFD700;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 2rem;
  padding: 0.5rem 1.2rem;
  box-shadow: 0 2px 12px rgba(108,99,255,0.10);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const AddButtonsRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  justify-content: center;
`;
const AddButton = styled.button`
  background: ${({ color, theme }) => color === 'nutrition' ? theme.colors.gradients.primaryAccent : theme.colors.accent.secondary};
  color: ${({ theme }) => theme.colors.text.heading};
  border: none;
  border-radius: 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 1.1rem 2.5rem;
  box-shadow: 0 2px 12px rgba(108,99,255,0.10);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
  &:hover, &:focus {
    background: ${({ color, theme }) => color === 'nutrition' ? theme.colors.accent.secondary : theme.colors.gradients.primaryAccent};
    transform: scale(1.04);
    box-shadow: 0 6px 24px rgba(108,99,255,0.18);
  }
`;
const SummaryCardsRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 1.2rem;
  }
`;
const SummaryCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.gradients.subtleBackground};
  border-radius: 1.2rem;
  box-shadow: 0 4px 16px rgba(108,99,255,0.10);
  padding: 1.5rem 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
`;
const CardTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  color: ${({ theme }) => theme.colors.text.heading};
`;
const CardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent.primary};
`;
const ActivityFeed = styled.div`
  margin-top: 2.5rem;
`;
const FeedTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.heading};
`;
const FeedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const FeedItem = styled.li`
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 0.8rem;
  padding: 1rem 1.5rem;
  margin-bottom: 0.7rem;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(108,99,255,0.06);
`;

// --- Modal for Quick Add ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(26, 26, 46, 0.25);
  backdrop-filter: blur(6px) saturate(1.2);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalBox = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px rgba(108,99,255,0.25), 0 8px 32px rgba(0,0,0,0.15);
  padding: 2.5rem 2rem 2rem 2rem;
  width: 450px;
  min-height: 450px;
  max-height: 550px;
  z-index: 3100;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
`;
const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 100%;
`;
const FormFields = styled.div`
  width: 100%;
  padding: 0 0.5rem;
`;
const ModalTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: 1rem;
  padding: 0.3rem;
`;
const ModalTab = styled.button`
  background: ${({ active, theme }) => active ? theme.colors.gradients.primaryAccent : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.text.heading : theme.colors.text.primary};
  border: none;
  border-radius: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  text-align: center;
  &:hover, &:focus {
    background: ${({ active, theme }) => active ? theme.colors.gradients.primaryAccent : theme.colors.accent.secondary};
    color: ${({ theme }) => theme.colors.text.heading};
    transform: ${({ active }) => active ? 'none' : 'translateY(-1px)'};
  }
`;
const ModalClose = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.accent.secondary};
    color: ${({ theme }) => theme.colors.text.heading};
    transform: scale(1.1);
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, #6C63FF 0%, #8A83FF 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  margin-top: auto;
  margin: 0 0.5rem;
  box-sizing: border-box;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(108,99,255,0.3);
  &:hover, &:focus {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(108,99,255,0.4);
  }
  &:active {
    transform: translateY(0);
  }
`;
const FormTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.heading};
  text-align: center;
`;
const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border.medium};
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: 400;
  }
  
  &:focus {
    outline: none;
    border-color: #6C63FF;
    background: ${({ theme }) => theme.colors.background.secondary};
    box-shadow: 0 0 0 3px rgba(108,99,255,0.1);
  }
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
`;
const MacroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;
const MacroInput = styled(InputField)`
  margin-bottom: 0;
  text-align: center;
  font-size: 0.95rem;
`;

// --- Quick Add Forms (Functional) ---
const QuickAddNutrition = ({ onSubmit }) => {
  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, clearError, addNutritionAsync } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (meal && calories) {
      setLoading(true);
      try {
        await addNutritionAsync({ 
          meal, 
          calories: parseInt(calories), 
          protein: protein ? parseInt(protein) : 0,
          carbs: carbs ? parseInt(carbs) : 0,
          fat: fat ? parseInt(fat) : 0
        });
        setMeal('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFat('');
        if (onSubmit) onSubmit();
      } catch (error) {
        // Error is handled by the context
        console.error('Failed to add nutrition:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FormContainer as="form" onSubmit={handleSubmit}>
      <FormFields>
        <FormTitle>Add Nutrition Entry</FormTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <InputField 
          placeholder="Meal name" 
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          required
          disabled={loading}
        />
        <InputField 
          placeholder="Calories" 
          type="number" 
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          required
          disabled={loading}
        />
        <MacroGrid>
          <MacroInput 
            placeholder="Protein (g)" 
            type="number" 
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            disabled={loading}
          />
          <MacroInput 
            placeholder="Carbs (g)" 
            type="number" 
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            disabled={loading}
          />
          <MacroInput 
            placeholder="Fat (g)" 
            type="number" 
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            disabled={loading}
          />
        </MacroGrid>
      </FormFields>
      {loading ? (
        <LoadingButton disabled>
          <LoadingSpinner />
          Adding...
        </LoadingButton>
      ) : (
        <SubmitButton type="submit">
          Add Nutrition
        </SubmitButton>
      )}
    </FormContainer>
  );
};

const QuickAddStrength = ({ onSubmit }) => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, clearError, addWorkoutAsync } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (exercise && sets && reps && weight) {
      setLoading(true);
      try {
        await addWorkoutAsync({ 
          exercise, 
          type: 'strength',
          sets: parseInt(sets), 
          reps: parseInt(reps), 
          weight: parseInt(weight),
          duration: 0
        });
        setExercise('');
        setSets('');
        setReps('');
        setWeight('');
        if (onSubmit) onSubmit();
      } catch (error) {
        // Error is handled by the context
        console.error('Failed to add strength workout:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FormContainer as="form" onSubmit={handleSubmit}>
      <FormFields>
        <FormTitle>Add Strength Exercise</FormTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <InputField 
          placeholder="Exercise name" 
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          required
          disabled={loading}
        />
        <InputField 
          placeholder="Sets" 
          type="number" 
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          required
          disabled={loading}
        />
        <InputField 
          placeholder="Reps" 
          type="number" 
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
          disabled={loading}
        />
        <InputField 
          placeholder="Weight (kg)" 
          type="number" 
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          disabled={loading}
        />
      </FormFields>
      {loading ? (
        <LoadingButton disabled>
          <LoadingSpinner />
          Adding...
        </LoadingButton>
      ) : (
        <SubmitButton type="submit">
          Add Strength
        </SubmitButton>
      )}
    </FormContainer>
  );
};

const QuickAddCardio = ({ onSubmit }) => {
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, clearError, addWorkoutAsync } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (exercise && duration) {
      setLoading(true);
      try {
        await addWorkoutAsync({ 
          exercise, 
          type: 'cardio',
          duration: parseInt(duration), 
          distance: distance ? parseFloat(distance) : 0
        });
        setExercise('');
        setDuration('');
        setDistance('');
        if (onSubmit) onSubmit();
      } catch (error) {
        // Error is handled by the context
        console.error('Failed to add cardio workout:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FormContainer as="form" onSubmit={handleSubmit}>
      <FormFields>
        <FormTitle>Add Cardio Exercise</FormTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <InputField 
          placeholder="Exercise name" 
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          required
          disabled={loading}
        />
        <InputField 
          placeholder="Duration (min)" 
          type="number" 
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          disabled={loading}
        />
        <InputField 
          placeholder="Distance (km) - optional" 
          type="number" 
          step="0.1"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          disabled={loading}
        />
      </FormFields>
      {loading ? (
        <LoadingButton disabled>
          <LoadingSpinner />
          Adding...
        </LoadingButton>
      ) : (
        <SubmitButton type="submit">
          Add Cardio
        </SubmitButton>
      )}
    </FormContainer>
  );
};

const ProgressLabel = styled.div`
  margin-top: 0.7rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ProgressRing = React.memo(function ProgressRing({ percent = 0, label = "" }) {
  const radius = 48;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const [displayPercent, setDisplayPercent] = useState(percent);
  const animRef = useRef();
  const isAnimating = useRef(false);
  const lastUpdate = useRef(Date.now());
  const animatedValue = useRef(percent);

  // Animate from 0 to percent, throttling state updates for smoothness
  const animateToPercent = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    isAnimating.current = true;
    animatedValue.current = 0;
    setDisplayPercent(0);
    let start = null;
    const duration = 600; // ms
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const next = percent * progress;
      animatedValue.current = next;
      // Only update state every ~16ms for smoothness
      if (timestamp - lastUpdate.current > 16 || progress === 1) {
        setDisplayPercent(next);
        lastUpdate.current = timestamp;
      }
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayPercent(percent);
        isAnimating.current = false;
      }
    }
    animRef.current = requestAnimationFrame(animate);
  }, [percent]);

  // On mouse leave, keep at percent
  const handleMouseLeave = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setDisplayPercent(percent);
    isAnimating.current = false;
  }, [percent]);

  // Only update displayPercent from percent if not animating
  useEffect(() => {
    if (!isAnimating.current) {
      setDisplayPercent(percent);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [percent]);

  const strokeDashoffset = circumference - (displayPercent / 100) * circumference;

  return (
    <div
      onMouseEnter={animateToPercent}
      onFocus={animateToPercent}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
      tabIndex={0}
      aria-label={label}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}
    >
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#2B2B4A"
          fill="none"
          strokeWidth={stroke}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
        />
        <circle
          stroke="url(#progress-gradient)"
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#8A83FF" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="1.5rem"
          fontWeight="700"
          fill="#6C63FF"
        >
          {Math.round(displayPercent)}%
        </text>
      </svg>
      <ProgressLabel>{label}</ProgressLabel>
    </div>
  );
});

// --- Enhanced Dashboard ---
const ProgressRingsRow = styled.div`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }
`;

const EnhancedDashboard = React.memo(function EnhancedDashboard() {
  const { profile } = useAuth();
  const {
    currentStreak,
    goals,
    getTodayCalories,
    getTodayProtein,
    getTodayCarbs,
    getTodayFat,
    getTodayWorkoutDuration,
    getTodayNutrition,
    getTodayWorkouts,
    addNutritionAsync,
    addWorkoutAsync
  } = useApp();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('nutrition');
  
  // Get real data
  const todayCalories = getTodayCalories();
  const todayProtein = getTodayProtein();
  const todayCarbs = getTodayCarbs();
  const todayFat = getTodayFat();
  const todayWorkoutDuration = getTodayWorkoutDuration();
  
  // Create activity feed from real data
  const activityFeed = useMemo(() => {
    const todayNutrition = getTodayNutrition();
    const todayWorkouts = getTodayWorkouts();
    
    const feed = [];
    
    // Add nutrition entries
    todayNutrition.forEach(entry => {
      feed.push({
        type: 'nutrition',
        text: `${entry.meal}: ${entry.calories} kcal`,
        time: new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    });
    
    // Add workout entries
    todayWorkouts.forEach(entry => {
      if (entry.type === 'strength') {
        feed.push({
          type: 'workout',
          text: `${entry.exercise}: ${entry.sets}x${entry.reps} ${entry.weight}kg`,
          time: new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      } else if (entry.type === 'cardio') {
        feed.push({
          type: 'workout',
          text: `${entry.exercise}: ${entry.duration} min, ${entry.distance}km`,
          time: new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    });
    
    // Sort by time (most recent first)
    return feed.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 6);
  }, [getTodayNutrition, getTodayWorkouts]);

  // Handle form submissions
  const handleNutritionSubmit = async (data) => {
    try {
      await addNutritionAsync(data);
      setModalOpen(false);
    } catch (error) {
      // Error is handled by the context
      console.error('Failed to add nutrition:', error);
    }
  };

  const handleWorkoutSubmit = async (data) => {
    try {
      await addWorkoutAsync(data);
      setModalOpen(false);
    } catch (error) {
      // Error is handled by the context
      console.error('Failed to add workout:', error);
    }
  };

  return (
    <div className={styles.page}>
      <GreetingRow>
        <GreetingText>Welcome back, {profile?.name || "User"}!</GreetingText>
        <StreakBadge>
          <span role="img" aria-label="fire">🔥</span> {currentStreak} day streak
        </StreakBadge>
      </GreetingRow>
      <ProgressRingsRow>
        <ProgressRing
          percent={Math.min(100, (todayCalories / goals.calories) * 100)}
          label={`Calories: ${todayCalories} / ${goals.calories}`}
        />
        <ProgressRing
          percent={Math.min(100, (todayProtein / goals.protein) * 100)}
          label={`Protein: ${todayProtein}g / ${goals.protein}g`}
        />
        <ProgressRing
          percent={Math.min(100, (todayWorkoutDuration / goals.workoutDuration) * 100)}
          label={`Workout: ${todayWorkoutDuration} / ${goals.workoutDuration} min`}
        />
      </ProgressRingsRow>
      <AddButtonsRow>
        <AddButton color="nutrition" onClick={() => { setModalOpen(true); setModalTab('nutrition'); }}>
          <span role="img" aria-label="apple">🍎</span> Add Nutrition
        </AddButton>
        <AddButton color="workout" onClick={() => { setModalOpen(true); setModalTab('strength'); }}>
          <span role="img" aria-label="dumbbell">🏋️</span> Add Workout
        </AddButton>
      </AddButtonsRow>
      <SummaryCardsRow>
        <SummaryCard>
          <CardTitle>Today's Calories</CardTitle>
          <CardValue>{todayCalories} kcal</CardValue>
          <div style={{marginTop: '0.5rem', color: '#8A83FF', fontSize: '0.9rem'}}>
            P: {todayProtein}g • C: {todayCarbs}g • F: {todayFat}g
          </div>
        </SummaryCard>
        <SummaryCard>
          <CardTitle>Today's Workout</CardTitle>
          <CardValue>{todayWorkoutDuration} min</CardValue>
          <div style={{marginTop: '0.5rem', color: '#8A83FF'}}>Goal: {goals.workoutDuration} min</div>
        </SummaryCard>
      </SummaryCardsRow>
      <ActivityFeed>
        <FeedTitle>Recent Activity</FeedTitle>
        <FeedList>
          {activityFeed.length > 0 ? (
            activityFeed.map((item, i) => (
              <FeedItem key={i}>
                {item.type === 'nutrition' ? '🍎' : '🏋️'} {item.text}
                <span style={{float: 'right', fontSize: '0.9rem', opacity: 0.7}}>{item.time}</span>
              </FeedItem>
            ))
          ) : (
            <FeedItem style={{textAlign: 'center', opacity: 0.7}}>
              No activity today. Start by adding nutrition or a workout!
            </FeedItem>
          )}
        </FeedList>
      </ActivityFeed>
      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalBox onClick={e => e.stopPropagation()}>
            <ModalClose onClick={() => setModalOpen(false)}>&times;</ModalClose>
            <ModalTabs>
              <ModalTab active={modalTab === 'nutrition'} onClick={() => setModalTab('nutrition')}>Nutrition</ModalTab>
              <ModalTab active={modalTab === 'strength'} onClick={() => setModalTab('strength')}>Strength</ModalTab>
              <ModalTab active={modalTab === 'cardio'} onClick={() => setModalTab('cardio')}>Cardio</ModalTab>
            </ModalTabs>
            <ModalContent>
              {modalTab === 'nutrition' && <QuickAddNutrition onSubmit={handleNutritionSubmit} />}
              {modalTab === 'strength' && <QuickAddStrength onSubmit={handleWorkoutSubmit} />}
              {modalTab === 'cardio' && <QuickAddCardio onSubmit={handleWorkoutSubmit} />}
            </ModalContent>
          </ModalBox>
        </ModalOverlay>
      )}
    </div>
  );
});

// Confirmation Dialog Components
const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(8px);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ConfirmationDialog = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1.5rem;
  padding: 2.5rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ConfirmationTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.heading};
  margin-bottom: 1rem;
`;

const ConfirmationMessage = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ConfirmationButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const CancelButton = styled.button`
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: 1rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.accent.secondary};
    color: ${({ theme }) => theme.colors.text.heading};
  }
`;

const DeleteButton = styled.button`
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(255, 107, 107, 0.3);
  
  &:hover, &:focus {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 107, 107, 0.4);
  }
`;

// Loading Spinner Component
const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingButton = styled(SubmitButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0.8;
  cursor: not-allowed;
  
  &:hover {
    transform: none;
    box-shadow: 0 4px 16px rgba(108,99,255,0.3);
  }
`;

// Error Message Component
const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
  color: white;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 4px 16px rgba(255, 107, 107, 0.2);
  animation: slideDown 0.3s ease-out;
  
  @keyframes slideDown {
    from { 
      opacity: 0;
      transform: translateY(-10px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Confirmation Dialog Component
const ConfirmationDialogComponent = ({ isOpen, onConfirm, onCancel, title, message, confirmText = "Delete", cancelText = "Cancel" }) => {
  if (!isOpen) return null;

  return (
    <ConfirmationOverlay>
      <ConfirmationDialog>
        <ConfirmationTitle>{title}</ConfirmationTitle>
        <ConfirmationMessage>{message}</ConfirmationMessage>
        <ConfirmationButtons>
          <CancelButton onClick={onCancel}>{cancelText}</CancelButton>
          <DeleteButton onClick={onConfirm}>{confirmText}</DeleteButton>
        </ConfirmationButtons>
      </ConfirmationDialog>
    </ConfirmationOverlay>
  );
};

function MainLayout({ children }) {
  const { user, profile } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuClosing, setMenuClosing] = React.useState(false);

  const handleCloseMenu = () => {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 200); // match animation duration
  };

  return (
    <>
      <Header
        onMenuClick={() => setMenuOpen(true)}
        profilePic={profile?.profilePic || user?.profilePic || DEFAULT_PROFILE_PIC}
      />
      {(menuOpen || menuClosing) && (
        <>
          <Overlay onClick={handleCloseMenu} />
          <Menu $closing={menuClosing}>
            <CloseButton aria-label="Close menu" onClick={handleCloseMenu}>&times;</CloseButton>
            <MenuItem to="/" onClick={handleCloseMenu}>
              <AnimatedIcon delay="0s"><HomeIcon /></AnimatedIcon> Home
            </MenuItem>
            <MenuItem to="/nutrition-history" onClick={handleCloseMenu}>
              <AnimatedIcon delay="0.3s"><NutritionIcon /></AnimatedIcon> Nutrition History
            </MenuItem>
            <MenuItem to="/exercise-history" onClick={handleCloseMenu}>
              <AnimatedIcon delay="0.6s"><ExerciseIcon /></AnimatedIcon> Exercise History
            </MenuItem>
            <MenuItem to="/profile" onClick={handleCloseMenu}>
              <AnimatedIcon delay="0.9s"><ProfileIcon /></AnimatedIcon> Profile
            </MenuItem>
          </Menu>
        </>
      )}
      {children}
      <Footer />
    </>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <div style={{textAlign: 'center', marginTop: '4rem', color: '#8A83FF'}}>Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* Protected routes */}
      <Route
        path="/"
        element={user ? (
          <MainLayout>
            <EnhancedDashboard />
          </MainLayout>
        ) : (
          <Navigate to="/login" replace />
        )}
      />
      <Route
        path="/nutrition-history"
        element={user ? (
          <MainLayout>
            <NutritionHistory />
          </MainLayout>
        ) : (
          <Navigate to="/login" replace />
        )}
      />
      <Route
        path="/exercise-history"
        element={user ? (
          <MainLayout>
            <ExerciseHistory />
          </MainLayout>
        ) : (
          <Navigate to="/login" replace />
        )}
      />
      <Route
        path="/profile"
        element={user ? (
          <MainLayout>
            <Profile />
          </MainLayout>
        ) : (
          <Navigate to="/login" replace />
        )}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ThemeProvider theme={clayTheme}>
          <div className={styles.app}>
            <AppErrorDisplay />
            <Router>
              <AppRoutes />
            </Router>
          </div>
        </ThemeProvider>
      </AppProvider>
    </AuthProvider>
  );
}

// Global Error Display Component
function AppErrorDisplay() {
  const { error, clearError } = useApp();

  if (!error) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '1rem',
      fontSize: '0.9rem',
      fontWeight: '600',
      boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)',
      zIndex: 5000,
      animation: 'slideInRight 0.3s ease-out',
      cursor: 'pointer',
      maxWidth: '300px'
    }} onClick={clearError}>
      {error} ✕
      </div>
  );
}

export default App;
