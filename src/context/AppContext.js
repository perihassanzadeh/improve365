import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  nutritionEntries: [],
  workoutEntries: [],
  user: {
    name: "Jane Doe",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    streak: 12,
    joinDate: "2023-01-01",
    weight: 68,
    height: 170
  },
  currentStreak: 12,
  goals: {
    calories: 2200,
    protein: 150,
    carbs: 250,
    fat: 80,
    steps: 10000,
    workoutDuration: 60
  },
  loading: false,
  error: null
};

// Action types
const ACTIONS = {
  ADD_NUTRITION: 'ADD_NUTRITION',
  ADD_WORKOUT: 'ADD_WORKOUT',
  DELETE_NUTRITION: 'DELETE_NUTRITION',
  DELETE_WORKOUT: 'DELETE_WORKOUT',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_STREAK: 'UPDATE_STREAK',
  UPDATE_GOALS: 'UPDATE_GOALS',
  LOAD_DATA: 'LOAD_DATA',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_NUTRITION:
      return {
        ...state,
        nutritionEntries: [
          {
            id: Date.now(),
            date: new Date().toISOString(),
            ...action.payload
          },
          ...state.nutritionEntries
        ]
      };
    
    case ACTIONS.ADD_WORKOUT:
      return {
        ...state,
        workoutEntries: [
          {
            id: Date.now(),
            date: new Date().toISOString(),
            ...action.payload
          },
          ...state.workoutEntries
        ]
      };
    
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case ACTIONS.UPDATE_STREAK:
      return {
        ...state,
        currentStreak: action.payload
      };
    
    case ACTIONS.UPDATE_GOALS:
      return {
        ...state,
        goals: { ...state.goals, ...action.payload }
      };
    
    case ACTIONS.LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
    
    case ACTIONS.DELETE_NUTRITION:
      return {
        ...state,
        nutritionEntries: state.nutritionEntries.filter(entry => entry.id !== action.payload)
      };
    
    case ACTIONS.DELETE_WORKOUT:
      return {
        ...state,
        workoutEntries: state.workoutEntries.filter(entry => entry.id !== action.payload)
      };
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('improve365-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: ACTIONS.LOAD_DATA, payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('improve365-data', JSON.stringify(state));
  }, [state]);

  // Helper functions
  const addNutrition = (nutritionData) => {
    dispatch({ type: ACTIONS.ADD_NUTRITION, payload: nutritionData });
  };

  const addWorkout = (workoutData) => {
    dispatch({ type: ACTIONS.ADD_WORKOUT, payload: workoutData });
  };

  const updateUser = (userData) => {
    dispatch({ type: ACTIONS.UPDATE_USER, payload: userData });
  };

  const updateStreak = (streak) => {
    dispatch({ type: ACTIONS.UPDATE_STREAK, payload: streak });
  };

  const updateGoals = (goals) => {
    dispatch({ type: ACTIONS.UPDATE_GOALS, payload: goals });
  };

  const deleteNutrition = (id) => {
    dispatch({ type: ACTIONS.DELETE_NUTRITION, payload: id });
  };

  const deleteWorkout = (id) => {
    dispatch({ type: ACTIONS.DELETE_WORKOUT, payload: id });
  };

  const setLoading = (loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  // Async wrapper functions with loading states
  const addNutritionAsync = async (nutritionData) => {
    try {
      setLoading(true);
      clearError();
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      addNutrition(nutritionData);
    } catch (error) {
      setError('Failed to add nutrition entry. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addWorkoutAsync = async (workoutData) => {
    try {
      setLoading(true);
      clearError();
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      addWorkout(workoutData);
    } catch (error) {
      setError('Failed to add workout entry. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteNutritionAsync = async (id) => {
    try {
      setLoading(true);
      clearError();
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      deleteNutrition(id);
    } catch (error) {
      setError('Failed to delete nutrition entry. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkoutAsync = async (id) => {
    try {
      setLoading(true);
      clearError();
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      deleteWorkout(id);
    } catch (error) {
      setError('Failed to delete workout entry. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get today's entries
  const getTodayNutrition = () => {
    const today = new Date().toDateString();
    return state.nutritionEntries.filter(entry => 
      new Date(entry.date).toDateString() === today
    );
  };

  const getTodayWorkouts = () => {
    const today = new Date().toDateString();
    return state.workoutEntries.filter(entry => 
      new Date(entry.date).toDateString() === today
    );
  };

  // Calculate today's totals
  const getTodayCalories = () => {
    return getTodayNutrition().reduce((total, entry) => total + (parseInt(entry.calories) || 0), 0);
  };

  const getTodayProtein = () => {
    return getTodayNutrition().reduce((total, entry) => total + (parseInt(entry.protein) || 0), 0);
  };

  const getTodayCarbs = () => {
    return getTodayNutrition().reduce((total, entry) => total + (parseInt(entry.carbs) || 0), 0);
  };

  const getTodayFat = () => {
    return getTodayNutrition().reduce((total, entry) => total + (parseInt(entry.fat) || 0), 0);
  };

  const getTodayWorkoutDuration = () => {
    return getTodayWorkouts().reduce((total, entry) => total + (parseInt(entry.duration) || 0), 0);
  };

  const value = {
    ...state,
    addNutrition,
    addWorkout,
    addNutritionAsync,
    addWorkoutAsync,
    deleteNutrition,
    deleteWorkout,
    deleteNutritionAsync,
    deleteWorkoutAsync,
    updateUser,
    updateStreak,
    updateGoals,
    setLoading,
    setError,
    clearError,
    getTodayNutrition,
    getTodayWorkouts,
    getTodayCalories,
    getTodayProtein,
    getTodayCarbs,
    getTodayFat,
    getTodayWorkoutDuration
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 