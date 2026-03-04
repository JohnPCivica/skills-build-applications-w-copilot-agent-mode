import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Octofit Tracker header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Octofit Tracker/i);
  expect(headerElement).toBeInTheDocument();
});
