import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">💰</div>
        <div className="brand-text">
          <span className="brand-title">LOVELY MONEY</span>
          <span className="brand-subtitle">Quản lý chi tiêu</span>
        </div>
      </div>

      <div className="nav-links">
        <NavLink to="/" end className="nav-item">
          <span className="nav-icon">🏠</span>
          <span>Trang chủ</span>
        </NavLink>
        <NavLink to="/expenses" end className="nav-item">
          <span className="nav-icon">📋</span>
          <span>Danh sách</span>
        </NavLink>
        <NavLink to="/expenses/new" end className="nav-item">
          <span className="nav-icon">➕</span>
          <span>Thêm mới</span>
        </NavLink>
      </div>

      <div className="nav-user-actions">
        <div className="sync-badge">
          <span className="sync-dot"></span>
          Đã đồng bộ
        </div>
        <div className="user-avatar" title="Sinh viên">
          👤
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
