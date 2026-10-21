import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses = [], onTogglePaid, onDelete }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleQueryShift = (e) => {
    setQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredExpenses = expenses.filter((item) => {
    const matchQuery = item.title.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === 'Tất cả' || item.category === category;
    return matchQuery && matchCategory;
  });

  const isMobile = width < 768;

  return (
    <div className="expense-list-page">
      <div className="view-mode">
        Chế độ: {isMobile ? 'Điện thoại' : 'Máy tính'}
      </div>

      <FilterBar
        query={query}
        category={category}
        handleQueryShift={handleQueryShift}
        onCategoryChange={handleCategoryChange}
      />

      <div className="search-result-count">
        Tìm thấy {filteredExpenses.length} khoản chi
      </div>

      {filteredExpenses.length === 0 && (
        <div className="no-data-alert">Không có dữ liệu</div>
      )}

      <div className={isMobile ? 'table-wrap mobile' : 'table-wrap'}>
        <ExpenseTable
          expenses={filteredExpenses}
          onTogglePaid={onTogglePaid}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default ExpenseList;
