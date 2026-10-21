import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseDetail = ({ expenses = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const expenseId = Number(id);
  const expense = expenses.find((item) => item.id === expenseId);

  if (!expense) {
    return (
      <div className="expense-detail-page">
        <p className="not-found">Không tìm thấy khoản chi</p>
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>
    );
  }

  const { title, amount, category, date, paid } = expense;

  return (
    <div className="expense-detail-page">
      <h2>Chi tiết khoản chi</h2>
      <div className="detail-info">
        <p>Tên khoản chi: {title}</p>
        <p>Số tiền: {formatMoney(amount)}</p>
        <p>Danh mục: {category}</p>
        <p>Ngày: {date}</p>
        <p>Trạng thái: {paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
      </div>
      <button
        type="button"
        className="btn-back"
        onClick={() => navigate(-1)}
      >
        Quay lại
      </button>
    </div>
  );
};

export default ExpenseDetail;
