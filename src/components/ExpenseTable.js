import React from 'react';
import ExpenseRow from './ExpenseRow';

const ExpenseTable = ({ expenses, onTogglePaid, onDelete }) => {
  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th className="col-title">Khoản chi</th>
          <th className="col-amount">Số tiền</th>
          <th className="col-category">Danh mục</th>
          <th className="col-date">Ngày</th>
          <th className="col-status">Trạng thái</th>
          <th className="col-actions">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              onTogglePaid={onTogglePaid}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan="6" className="empty-cell">
              Không có dữ liệu
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
