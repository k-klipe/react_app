import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const HabitsContext = createContext(null);

const LOCAL_STORAGE_KEY = 'habits_state_v1';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { habits: [], filter: 'все' };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.habits)) return { habits: [], filter: 'все' };
    return { habits: parsed.habits, filter: parsed.filter || 'все' };
  } catch {
    return { habits: [], filter: 'все' };
  }
}

function saveState(state) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function habitsReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const newHabit = {
        id: crypto.randomUUID(),
        title: action.title,
        frequency: action.frequency, // 'ежедневно' | 'еженедельно' | 'ежемесячно'
        completedToday: false,
        streak: 0,
        createdAt: Date.now(),
      };
      return { ...state, habits: [newHabit, ...state.habits] };
    }
    case 'toggleToday': {
      const today = new Date().toDateString();
      const updated = state.habits.map(h => {
        if (h.id !== action.id) return h;
        const completed = !h.completedToday;
        const lastMarkedDate = h.lastMarkedDate || null;
        const isSameDay = lastMarkedDate === today;
        const newStreak = completed
          ? (isSameDay ? h.streak : (h.completedToday ? h.streak : h.streak + 1))
          : h.streak;
        return {
          ...h,
          completedToday: completed,
          lastMarkedDate: completed ? today : lastMarkedDate,
          streak: newStreak,
        };
      });
      return { ...state, habits: updated };
    }
    case 'delete': {
      return { ...state, habits: state.habits.filter(h => h.id !== action.id) };
    }
    case 'filter': {
      return { ...state, filter: action.filter };
    }
    default:
      return state;
  }
}

export function HabitsProvider({ children }) {
  const [state, dispatch] = useReducer(habitsReducer, undefined, loadInitialState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error('useHabits must be used within HabitsProvider');
  return ctx;
}


