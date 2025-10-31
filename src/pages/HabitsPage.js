import React from 'react';
import HabitForm from '../components/HabitForm';
import FilterBar from '../components/FilterBar';
import HabitList from '../components/HabitList';

export default function HabitsPage() {
  return (
    <div className="page">
      <h1>Привычки</h1>
      <HabitForm />
      <FilterBar />
      <HabitList />
    </div>
  );
}


