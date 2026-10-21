import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddExpense = ({ onAddExpense }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || amount === '' || !category.trim() || !date.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const numAmount = Number(amount);
    if (
      !Number.isInteger(numAmount) ||
      numAmount < 1000 ||
      numAmount > 100000000
    ) {
      setErrorMessage('Số tiền phải từ 1.000 đến 100.000.000');
      return;
    }

    onAddExpense({
      title: title.trim(),
      amount: numAmount,
      category,
      date,
      paid: false,
    });

    navigate('/expenses', { replace: true });
  };

  return (
    <div className="add-expense-page">
      <h2>Thêm khoản chi mới</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="expense-title">Tên khoản chi</label>
          <input
            id="expense-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expense-amount">Số tiền</label>
          <input
            id="expense-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expense-category">Danh mục</label>
          <select
            id="expense-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="expense-date">Ngày chi</label>
          <input
            id="expense-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit">
          Thêm
        </button>

        {errorMessage && <p className="form-error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddExpense;
