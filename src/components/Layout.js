import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  return (
    <div className="layout-container">
      <NavBar />
      <div className="main-content">
        {loading ? (
          <div className="status-message">Đang tải...</div>
        ) : error ? (
          <div className="status-message error">Không tải được dữ liệu</div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Layout;
