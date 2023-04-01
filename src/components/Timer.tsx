import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Подключение нужной локали
import 'dayjs/locale/ru';
import './timer.css';

const Timer: React.FC = () => {
	// Инициализация состояния
	const [timeRemaining, setTimeRemaining] = useState<number>(0);
	const [startTime, setStartTime] = useState(dayjs().locale('en'));
	const [isActive, setIsActive] = useState<boolean>(false);

	// Инициализация рефа для сохранения ID таймера
	const timerIdRef = useRef<NodeJS.Timeout | undefined>(undefined);

	// Обработчик нажатия на кнопку "Старт"
	function handleStart(): void {
		if (!isActive) {
			// Если таймер был остановлен при помощи кнопки "Stop", устанавливаем новое начальное время
			if (timeRemaining === 0) {
				setStartTime(dayjs());
			} else {
				setStartTime(dayjs().subtract(timeRemaining, 'second'));
			}
		}
		setIsActive(true);
	}

	// Обработчик нажатия на кнопку "Стоп"
	function handleStop(): void {
		setIsActive(false);
		if (timerIdRef.current !== undefined) {
			clearInterval(timerIdRef.current);
		}
	}

	// Обработчик нажатия на кнопку "Сброс"
	function handleReset(): void {
		setTimeRemaining(0);
		setStartTime(dayjs());
	}

	// Форматирование времени в часы, минуты, секунды
	function formatTime(time: number): string[] {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time - hours * 3600) / 60);
		const seconds = time - hours * 3600 - minutes * 60;

		return [
			hours.toString().padStart(2, '0'),
			minutes.toString().padStart(2, '0'),
			seconds.toString().padStart(2, '0'),
		];
	}

	// Обновление времени каждую секунду
	useEffect(() => {
		if (isActive) {
			const id = setInterval(() => {
				setTimeRemaining(dayjs().diff(startTime, 'second'));
			}, 1000);
			timerIdRef.current = id;
			return () => {
				if (timerIdRef.current !== undefined) {
					clearInterval(timerIdRef.current);
				}
			};
		}
	}, [isActive, startTime]);

	return (
		<>
			<div className='timer-container'>
				<div className='timer'>
					<div className='timer-digit' id='timer-hours'>
						{formatTime(timeRemaining)[0]}
					</div>
					<div className='timer-label'>Hours</div>
				</div>
				<div className='timer'>
					<div className='timer-digit' id='timer-minutes'>
						{formatTime(timeRemaining)[1]}
					</div>
					<div className='timer-label'>Minutes</div>
				</div>
				<div className='timer'>
					<div className='timer-digit' data-testid='timer-seconds'>
						{formatTime(timeRemaining)[2]}
					</div>
					<div className='timer-label'>Seconds</div>
				</div>
			</div>

			<div>
				<button className='btn' onClick={handleStart} disabled={isActive}>
					Start
				</button>
				<button className='btn' onClick={handleStop} disabled={!isActive}>
					Stop
				</button>
				<button className='btn' onClick={handleReset}>
					Reset
				</button>
			</div>
		</>
	);
};

export default Timer;
