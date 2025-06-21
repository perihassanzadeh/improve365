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
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 107, 107, 0.3);
  border-radius: 50%;
  border-top-color: #FF6B6B;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
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

// Delete Button Component
const DeleteEntryButton = styled.button`
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.2);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &:hover, &:focus {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const NutritionHistory = () => {
  const { nutritionEntries, loading, error, deleteNutritionAsync } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, entry: null });

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

  const handleDeleteClick = (entry) => {
    setDeleteDialog({ isOpen: true, entry });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.entry) {
      try {
        await deleteNutritionAsync(deleteDialog.entry.id);
        setDeleteDialog({ isOpen: false, entry: null });
      } catch (error) {
        console.error('Failed to delete nutrition entry:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, entry: null });
  };

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

      {error && <ErrorMessage>{error}</ErrorMessage>}

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <EntryCalories>{entry.calories} kcal</EntryCalories>
                <DeleteEntryButton 
                  onClick={() => handleDeleteClick(entry)}
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : '🗑️'}
                </DeleteEntryButton>
              </div>
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

      {/* Confirmation Dialog */}
      {deleteDialog.isOpen && (
        <ConfirmationOverlay>
          <ConfirmationDialog>
            <ConfirmationTitle>Delete Nutrition Entry</ConfirmationTitle>
            <ConfirmationMessage>
              Are you sure you want to delete "{deleteDialog.entry?.meal}"? 
              This action cannot be undone.
            </ConfirmationMessage>
            <ConfirmationButtons>
              <CancelButton onClick={handleDeleteCancel}>Cancel</CancelButton>
              <DeleteButton onClick={handleDeleteConfirm} disabled={loading}>
                {loading ? <LoadingSpinner /> : 'Delete'}
              </DeleteButton>
            </ConfirmationButtons>
          </ConfirmationDialog>
        </ConfirmationOverlay>
      )}
    </PageContainer>
  );
};

export default NutritionHistory; 