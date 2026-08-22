import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders without crashing', () => {
  const { container } = render(<App />);
  const copyrightElement = container.querySelector('#copyright');
  expect(copyrightElement).toBeInTheDocument();
});
