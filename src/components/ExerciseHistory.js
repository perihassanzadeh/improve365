import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppContext';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.heading};
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchInput = styled.input`
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1.5px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  min-width: 250px;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent.primary}33;
  }
`;

const FilterSelect = styled.select`
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1.5px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    outline: none;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.gradients.subtleBackground};
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 16px rgba(108, 99, 255, 0.1);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const EntriesContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(108, 99, 255, 0.1);
`;

const EntryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: background 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const EntryInfo = styled.div`
  flex: 1;
`;

const EntryTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.heading};
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WorkoutType = styled.span`
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ type }) => 
    type === 'strength' 
      ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)'
      : 'linear-gradient(135deg, #4ECDC4 0%, #6EE7DF 100%)'
  };
  color: white;
`;

const EntryDetails = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EntryMetrics = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const MetricValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent.primary};
`;

const MetricLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const ExerciseHistory = () => {
  const { workoutEntries } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Filter and search entries
  const filteredEntries = useMemo(() => {
    let filtered = workoutEntries;

    // Apply period filter
    if (filterPeriod !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filterPeriod) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(entry => new Date(entry.date) >= filterDate);
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(entry => entry.type === filterType);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(entry =>
        entry.exercise.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [workoutEntries, searchTerm, filterPeriod, filterType]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalWorkouts = workoutEntries.length;
    const totalDuration = workoutEntries.reduce((sum, entry) => sum + (parseInt(entry.duration) || 0), 0);
    const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;
    const todayWorkouts = workoutEntries.filter(entry => {
      const entryDate = new Date(entry.date).toDateString();
      const today = new Date().toDateString();
      return entryDate === today;
    }).length;
    
    const strengthWorkouts = workoutEntries.filter(entry => entry.type === 'strength').length;
    const cardioWorkouts = workoutEntries.filter(entry => entry.type === 'cardio').length;

    return { 
      totalWorkouts, 
      totalDuration, 
      avgDuration, 
      todayWorkouts, 
      strengthWorkouts, 
      cardioWorkouts 
    };
  }, [workoutEntries]);

  const renderWorkoutMetrics = (entry) => {
    if (entry.type === 'strength') {
      return (
        <>
          <MetricValue>{entry.sets}x{entry.reps}</MetricValue>
          <MetricLabel>{entry.weight}kg</MetricLabel>
        </>
      );
    } else if (entry.type === 'cardio') {
      return (
        <>
          <MetricValue>{entry.duration} min</MetricValue>
          <MetricLabel>{entry.distance}km</MetricLabel>
        </>
      );
    }
    return (
      <>
        <MetricValue>{entry.duration} min</MetricValue>
        <MetricLabel>Duration</MetricLabel>
      </>
    );
  };

  return (
    <PageContainer>
      <Header>
        <Title>Exercise History</Title>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
          </FilterSelect>
          <FilterSelect
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </FilterSelect>
        </SearchContainer>
      </Header>

      <StatsContainer>
        <StatCard>
          <StatValue>{stats.totalWorkouts}</StatValue>
          <StatLabel>Total Workouts</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalDuration}</StatValue>
          <StatLabel>Total Minutes</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.avgDuration}</StatValue>
          <StatLabel>Avg Duration</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.todayWorkouts}</StatValue>
          <StatLabel>Today's Workouts</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.strengthWorkouts}</StatValue>
          <StatLabel>Strength</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.cardioWorkouts}</StatValue>
          <StatLabel>Cardio</StatLabel>
        </StatCard>
      </StatsContainer>

      <EntriesContainer>
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <EntryItem key={entry.id}>
              <EntryInfo>
                <EntryTitle>
                  {entry.exercise}
                  <WorkoutType type={entry.type}>
                    {entry.type}
                  </WorkoutType>
                </EntryTitle>
                <EntryDetails>
                  {new Date(entry.date).toLocaleDateString()} at{' '}
                  {new Date(entry.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </EntryDetails>
              </EntryInfo>
              <EntryMetrics>
                {renderWorkoutMetrics(entry)}
              </EntryMetrics>
            </EntryItem>
          ))
        ) : (
          <EmptyState>
            <EmptyIcon>🏋️</EmptyIcon>
            <h3>No workout entries found</h3>
            <p>
              {searchTerm || filterPeriod !== 'all' || filterType !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start tracking your workouts to see your history here!'
              }
            </p>
          </EmptyState>
        )}
      </EntriesContainer>
    </PageContainer>
  );
};

export default ExerciseHistory; 