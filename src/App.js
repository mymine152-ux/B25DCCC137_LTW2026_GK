const BUILD_TAG = "mv-3358";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('gk_expenses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setExpenses(parsed);
        setLoading(false);
        return;
      } catch (e) {
        console.error('Lỗi phân tích localStorage:', e);
      }
    }

    const controller = new AbortController();

    axios
      .get('/data/expenses.json', { signal: controller.signal })
      .then((res) => {
        setExpenses(res.data);
        setError(null);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError(err.message || 'Không tải được dữ liệu');
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_expenses', JSON.stringify(expenses));
    }
  }, [expenses, loading]);

  const handleAddExpense = (newExpense) => {
    const maxId =
      expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) : 0;
    const itemToAdd = {
      ...newExpense,
      id: maxId + 1,
    };
    setExpenses((prev) => [...prev, itemToAdd]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTogglePaid = (id) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, paid: !item.paid } : item
      )
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home expenses={expenses} />} />
        <Route
          path="expenses"
          element={
            <ExpenseList
              expenses={expenses}
              onTogglePaid={handleTogglePaid}
              onDelete={handleDeleteExpense}
            />
          }
        />
        <Route
          path="expenses/new"
          element={<AddExpense onAddExpense={handleAddExpense} />}
        />
        <Route
          path="expenses/:id"
          element={<ExpenseDetail expenses={expenses} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
export { BUILD_TAG };
