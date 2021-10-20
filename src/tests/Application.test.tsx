import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './../Application';

test('Should say Hola', () => {
  render(<App />);
  const textElement = screen.getByText(/Hola/i);
  expect(textElement).toBeInTheDocument();
});
