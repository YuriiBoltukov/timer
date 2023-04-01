import { render, fireEvent, screen } from '@testing-library/react';
import Timer from './Timer';

describe('Timer', () => {
	it('should start timer', () => {
		jest.useFakeTimers();

		const { rerender } = render(<Timer />);

		fireEvent.click(screen.getByText('Start'));

		jest.advanceTimersByTime(2000);

		rerender(<Timer />);

		const seconds = screen.getByTestId('timer-seconds');

		expect(seconds.innerHTML).toContain('02');
	});

	it('should stop timer', () => {
		jest.useFakeTimers();

		const { rerender } = render(<Timer />);

		fireEvent.click(screen.getByText('Start'));

		jest.advanceTimersByTime(2000);

		fireEvent.click(screen.getByText('Stop'));

		rerender(<Timer />);

		const seconds = screen.getByTestId('timer-seconds');

		expect(seconds.innerHTML).toContain('02');
	});

	it('should reset timer', () => {
		jest.useFakeTimers();

		const { rerender } = render(<Timer />);

		fireEvent.click(screen.getByText('Start'));

		jest.advanceTimersByTime(2000);

		fireEvent.click(screen.getByText('Reset'));

		rerender(<Timer />);

		const seconds = screen.getByTestId('timer-seconds');

		expect(seconds.innerHTML).toContain('00');
	});
});
