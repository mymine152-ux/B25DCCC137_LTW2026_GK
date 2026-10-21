import React from 'react';
import { formatMoney } from '../data';

const Home = ({ expenses = [] }) => {
  const totalCount = expenses.length;
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalUnpaid = expenses.reduce(
    (acc, curr) => (!curr.paid ? acc + curr.amount : acc),
    0
  );

  const getSummaryMonth = () => {
    if (expenses.length > 0 && expenses[0].date) {
      const parts = expenses[0].date.split('-');
      if (parts.length >= 2) {
        return `${parts[1]}/${parts[0]}`;
      }
    }
    const now = new Date();
    return `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  };

  const summaryMonth = getSummaryMonth();

  return (
    <div className="home-page">
      <div className="home-top-bar">
        <div className="home-heading-wrap">
          <h1>Chi tiêu cá nhân</h1>
          <span className="sub-heading">Tổng quan tình hình tài chính của bạn</span>
        </div>
        <div className="summary-month-badge">
          Tháng: {summaryMonth}
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card card-blue">
          <div className="card-top">
            <span className="card-badge-icon">📊</span>
            <span className="card-mini-label">SỐ LƯỢNG KHOẢN CHI</span>
          </div>
          <div className="card-body">
            <p className="stat-text">Tổng số khoản chi: {totalCount}</p>
          </div>
          <div className="card-footer">
            <span>Toàn bộ giao dịch ghi nhận</span>
          </div>
        </div>

        <div className="stat-card card-red">
          <div className="card-top">
            <span className="card-badge-icon">💸</span>
            <span className="card-mini-label">TỔNG TIỀN ĐÃ CHI</span>
          </div>
          <div className="card-body">
            <p className="stat-text">Tổng số tiền đã chi: {formatMoney(totalSpent)}</p>
          </div>
          <div className="card-footer">
            <span>Đã bao gồm tất cả các mục</span>
          </div>
        </div>

        <div className="stat-card card-orange">
          <div className="card-top">
            <span className="card-badge-icon">⏳</span>
            <span className="card-mini-label">CẦN THANH TOÁN</span>
          </div>
          <div className="card-body">
            <p className="stat-text">Tổng số tiền chưa thanh toán: {formatMoney(totalUnpaid)}</p>
          </div>
          <div className="card-footer">
            <span>Cần chú ý chi trả đúng hạn</span>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <div className="section-header">
            <h3>📑 Phân chia theo danh mục</h3>
            <span className="section-desc">Chi tiết số tiền theo từng nhóm</span>
          </div>
          <div className="category-overview-list">
            {['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'].map((cat) => {
              const catExpenses = expenses.filter((e) => e.category === cat);
              const catTotal = catExpenses.reduce((sum, e) => sum + e.amount, 0);
              const percent = totalSpent > 0 ? Math.round((catTotal / totalSpent) * 100) : 0;
              return (
                <div key={cat} className="category-row-item">
                  <div className="cat-info">
                    <span className="cat-name">{cat}</span>
                    <span className="cat-count">({catExpenses.length} khoản chi)</span>
                  </div>
                  <div className="cat-meta">
                    <span className="cat-amount">{formatMoney(catTotal)}</span>
                    <span className="cat-percent">{percent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <h3>💳 Tình trạng thanh toán</h3>
            <span className="section-desc">Phân loại các khoản chi đã trả và chưa trả</span>
          </div>
          <div className="payment-status-grid">
            <div className="payment-box paid-box">
              <span className="box-title">Đã thanh toán</span>
              <span className="box-value">
                {formatMoney(totalSpent - totalUnpaid)}
              </span>
              <span className="box-sub">
                {expenses.filter((e) => e.paid).length} giao dịch hoàn tất
              </span>
            </div>
            <div className="payment-box unpaid-box">
              <span className="box-title">Chưa thanh toán</span>
              <span className="box-value">{formatMoney(totalUnpaid)}</span>
              <span className="box-sub">
                {expenses.filter((e) => !e.paid).length} giao dịch đang chờ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
