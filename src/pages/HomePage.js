import React from 'react';
import { useHabits } from '../context/HabitsContext';

export default function HomePage() {
  const { state } = useHabits();
  const total = state.habits.length;
  const completed = state.habits.filter(h => h.completedToday).length;
  const active = total - completed;

  return (
    <div className="page">
      <h1>Обзор</h1>
      <p>Добро пожаловать в Привычки+. Отмечайте выполнение и следите за прогрессом.</p>
      <div className="stats-cards">
        <div className="card">
          <div className="card-title">Всего привычек</div>
          <div className="card-value">{total}</div>
        </div>
        <div className="card">
          <div className="card-title">Выполнено сегодня</div>
          <div className="card-value success">{completed}</div>
        </div>
        <div className="card">
          <div className="card-title">Осталось сегодня</div>
          <div className="card-value warn">{active}</div>
        </div>
      </div>
    </div>
  );
}


