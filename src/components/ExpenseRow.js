import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseRow = ({ expense, onTogglePaid, onDelete }) => {
  const { id, title, amount, category, date, paid } = expense;

  return (
    <tr className="expense-row">
      <td className="col-title">
        <Link to={`/expenses/${id}`}>{title}</Link>
      </td>
      <td className="col-amount">{formatMoney(amount)}</td>
      <td className="col-category">{category}</td>
      <td className="col-date">{date}</td>
      <td className="col-status">
        <span className={paid ? 'status-paid' : 'status-unpaid'}>
          {paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </span>
      </td>
      <td className="col-actions">
        <button
          type="button"
          className="btn-toggle"
          onClick={() => onTogglePaid(id)}
        >
          {paid ? 'Đánh dấu chưa trả' : 'Đánh dấu đã trả'}
        </button>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ExpenseRow;
