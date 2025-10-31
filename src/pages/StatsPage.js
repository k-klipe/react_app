import React, { useMemo } from 'react';
import { useHabits } from '../context/HabitsContext';

export default function StatsPage() {
  const { state } = useHabits();
  const top = useMemo(() => {
    return [...state.habits]
      .sort((a, b) => (b.streak || 0) - (a.streak || 0))
      .slice(0, 5);
  }, [state.habits]);

  return (
    <div className="page">
      <h1>Статистика</h1>
      {top.length === 0 ? (
        <div className="empty">Добавьте привычки, чтобы увидеть статистику</div>
      ) : (
        <div className="table">
          <div className="table-header">
            <div>Название</div>
            <div>Частота</div>
            <div>Серия</div>
          </div>
          {top.map(h => (
            <div key={h.id} className="table-row">
              <div>{h.title}</div>
              <div><span className="badge">{h.frequency}</span></div>
              <div>{h.streak}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


