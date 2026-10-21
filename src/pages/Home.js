import React from 'react';
import { formatMoney } from '../data';

const Home = ({ expenses = [] }) => {
  const totalCount = expenses.length;
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalUnpaid = expenses.reduce(
    (acc, curr) => (!curr.paid ? acc + curr.amount : acc),
    0
  );

  return (
    <div className="home-page">
      <h1>Chi tiêu cá nhân</h1>
      <div className="stats-container">
        <p>Tổng số khoản chi: {totalCount}</p>
        <p>Tổng số tiền đã chi: {formatMoney(totalSpent)}</p>
        <p>Tổng số tiền chưa thanh toán: {formatMoney(totalUnpaid)}</p>
      </div>
    </div>
  );
};

export default Home;
