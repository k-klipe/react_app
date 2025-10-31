import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HabitsProvider } from './context/HabitsContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import HabitsPage from './pages/HabitsPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <HabitsProvider>
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </main>
      </div>
    </HabitsProvider>
  );
}

export default App;
