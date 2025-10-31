import React, { useMemo } from 'react';
import { useHabits } from '../context/HabitsContext';

export default function HabitList() {
  const { state, dispatch } = useHabits();

  const filtered = useMemo(() => {
    if (state.filter === 'все') return state.habits;
    if (state.filter === 'активные') return state.habits.filter(h => !h.completedToday);
    if (state.filter === 'выполненные') return state.habits.filter(h => h.completedToday);
    return state.habits;
  }, [state.habits, state.filter]);

  if (filtered.length === 0) {
    return <div className="empty">Нет привычек для отображения</div>;
  }

  return (
    <ul className="habit-list">
      {filtered.map(h => (
        <li key={h.id} className="habit-item">
          <label className={h.completedToday ? 'habit-title done' : 'habit-title'}>
            <input
              type="checkbox"
              checked={!!h.completedToday}
              onChange={() => dispatch({ type: 'toggleToday', id: h.id })}
            />
            <span>{h.title}</span>
          </label>
          <div className="habit-meta">
            <span className="badge">{h.frequency}</span>
            <span className="streak">Серия: {h.streak}</span>
            <button className="btn danger" onClick={() => dispatch({ type: 'delete', id: h.id })}>
              Удалить
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}


