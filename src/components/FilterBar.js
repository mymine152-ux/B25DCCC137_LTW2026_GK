import React from 'react';
import { CATEGORIES } from '../data';

const FilterBar = ({ query, category, handleQueryShift, onCategoryChange }) => {
  return (
    <div className="filter-bar">
      <div className="filter-item">
        <label htmlFor="search-input">Tìm kiếm</label>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleQueryShift}
          placeholder="Tìm theo tên khoản chi..."
        />
      </div>
      <div className="filter-item">
        <label htmlFor="category-select">Danh mục</label>
        <select
          id="category-select"
          value={category}
          onChange={onCategoryChange}
        >
          <option value="Tất cả">Tất cả</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
