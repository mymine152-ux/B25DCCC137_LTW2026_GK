import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Trang chủ menu and loading state', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText('Trang chủ')).toBeInTheDocument();
  expect(screen.getByText('Đang tải...')).toBeInTheDocument();
});
