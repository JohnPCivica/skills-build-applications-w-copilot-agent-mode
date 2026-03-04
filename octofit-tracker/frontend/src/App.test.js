import { render, screen } from '@testing-library/react';
import App from './App';

test('renders OctoFit Tracker navigation', () => {
  render(<App />);
  const heading = screen.getByText(/OctoFit Tracker/i);
  expect(heading).toBeInTheDocument();
});
