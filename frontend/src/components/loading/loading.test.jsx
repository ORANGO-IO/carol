import { render, screen } from '@testing-library/react';
import { Loading } from '../index';

describe('Loading Component', () => {
  it('should render loading spinner', () => {
    render(<Loading />);
    const loadingElement = screen.getByTestId('loading-spinner');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should display message when provided', () => {
    const message = 'Carregando dados...';
    render(<Loading message={message} />);
    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  it('should not display message when not provided', () => {
    const { container } = render(<Loading />);
    const messageElements = container.querySelectorAll('[data-testid="loading-message"]');
    expect(messageElements.length).toBe(0);
  });
});