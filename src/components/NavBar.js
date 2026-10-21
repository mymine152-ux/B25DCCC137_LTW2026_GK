import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" end className="nav-item">
          Trang chủ
        </NavLink>
        <NavLink to="/expenses" end className="nav-item">
          Danh sách
        </NavLink>
        <NavLink to="/expenses/new" end className="nav-item">
          Thêm mới
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
