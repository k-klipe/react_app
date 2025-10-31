import React, { useState } from 'react';
import { useHabits } from '../context/HabitsContext';

export default function HabitForm() {
  const { dispatch } = useHabits();
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState('ежедневно');

  function onSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch({ type: 'add', title: trimmed, frequency });
    setTitle('');
    setFrequency('ежедневно');
  }

  return (
    <form className="habit-form" onSubmit={onSubmit}>
      <input
        className="input"
        placeholder="Новая привычка"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select className="select" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="ежедневно">Ежедневно</option>
        <option value="еженедельно">Еженедельно</option>
        <option value="ежемесячно">Ежемесячно</option>
      </select>
      <button className="btn primary" type="submit">Добавить</button>
    </form>
  );
}


