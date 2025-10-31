import React from 'react';
import { useHabits } from '../context/HabitsContext';

export default function FilterBar() {
  const { state, dispatch } = useHabits();
  return (
    <div className="filter-bar">
      <label className="filter-label">Фильтр:</label>
      <select
        className="filter-select"
        value={state.filter}
        onChange={(e) => dispatch({ type: 'filter', filter: e.target.value })}
      >
        <option value="все">Все</option>
        <option value="активные">Активные</option>
        <option value="выполненные">Выполненные сегодня</option>
      </select>
    </div>
  );
}


