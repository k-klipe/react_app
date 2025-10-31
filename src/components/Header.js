import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <Link to="/" className="brand-link">Привычки+</Link>
      </div>
      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Обзор
        </NavLink>
        <NavLink to="/habits" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Привычки
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Статистика
        </NavLink>
      </nav>
    </header>
  );
}


