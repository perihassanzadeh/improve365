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
`;

const EntryDetails = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EntryCalories = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent.primary};
  text-align: right;
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

const NutritionHistory = () => {
  const { nutritionEntries } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');

  // Filter and search entries
  const filteredEntries = useMemo(() => {
    let filtered = nutritionEntries;

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

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(entry =>
        entry.meal.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [nutritionEntries, searchTerm, filterPeriod]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalEntries = nutritionEntries.length;
    const totalCalories = nutritionEntries.reduce((sum, entry) => sum + (parseInt(entry.calories) || 0), 0);
    const totalProtein = nutritionEntries.reduce((sum, entry) => sum + (parseInt(entry.protein) || 0), 0);
    const totalCarbs = nutritionEntries.reduce((sum, entry) => sum + (parseInt(entry.carbs) || 0), 0);
    const totalFat = nutritionEntries.reduce((sum, entry) => sum + (parseInt(entry.fat) || 0), 0);
    const avgCalories = totalEntries > 0 ? Math.round(totalCalories / totalEntries) : 0;
    const todayEntries = nutritionEntries.filter(entry => {
      const entryDate = new Date(entry.date).toDateString();
      const today = new Date().toDateString();
      return entryDate === today;
    }).length;

    return { totalEntries, totalCalories, totalProtein, totalCarbs, totalFat, avgCalories, todayEntries };
  }, [nutritionEntries]);

  return (
    <PageContainer>
      <Header>
        <Title>Nutrition History</Title>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
          <StatValue>{stats.totalEntries}</StatValue>
          <StatLabel>Total Entries</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalCalories}</StatValue>
          <StatLabel>Total Calories</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalProtein}</StatValue>
          <StatLabel>Total Protein (g)</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalCarbs}</StatValue>
          <StatLabel>Total Carbs (g)</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalFat}</StatValue>
          <StatLabel>Total Fat (g)</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.avgCalories}</StatValue>
          <StatLabel>Avg Calories</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.todayEntries}</StatValue>
          <StatLabel>Today's Entries</StatLabel>
        </StatCard>
      </StatsContainer>

      <EntriesContainer>
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <EntryItem key={entry.id}>
              <EntryInfo>
                <EntryTitle>{entry.meal}</EntryTitle>
                <EntryDetails>
                  {new Date(entry.date).toLocaleDateString()} at{' '}
                  {new Date(entry.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                  {entry.protein && ` • P: ${entry.protein}g`}
                  {entry.carbs && ` • C: ${entry.carbs}g`}
                  {entry.fat && ` • F: ${entry.fat}g`}
                </EntryDetails>
              </EntryInfo>
              <EntryCalories>{entry.calories} kcal</EntryCalories>
            </EntryItem>
          ))
        ) : (
          <EmptyState>
            <EmptyIcon>🍎</EmptyIcon>
            <h3>No nutrition entries found</h3>
            <p>
              {searchTerm || filterPeriod !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start tracking your nutrition to see your history here!'
              }
            </p>
          </EmptyState>
        )}
      </EntriesContainer>
    </PageContainer>
  );
};

export default NutritionHistory; 