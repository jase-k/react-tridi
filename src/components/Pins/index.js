import React from 'react';
import styles from './styles.module.css';

const Pins = ({
	pins,
	viewerWidth,
	viewerHeight,
	currentFrameId,
	pinWidth,
	pinHeight,
	renderPin,
	onPinDoubleClick,
	onPinClick
}) => {
	const getPosition = (pin) => {
		let left = viewerWidth * pin.x - pinWidth / 2;
		let top = viewerHeight * pin.y - pinHeight / 2;
		if (left < 0) left = 0;
		if (top < 0) top = 0;
		if (left >= 0 && top >= 0) return { left, top };
		return { display: 'none' };
	};
	return (
		<div className="tridi-dots-wrapper">
			{pins?.length > 0 &&
				pins
					.filter((pin) => pin.frameId === currentFrameId)
					.map((pin, index) =>
						renderPin ? (
							<div
								key={index}
								className={`tridi-pin ${styles['tridi-pin']}`}
								style={getPosition(pin)}
								onDoubleClick={(e) => {
									e.stopPropagation();
									onPinDoubleClick(pin);
								}}
								onClick={(e) => {
									e.stopPropagation();
									onPinClick(pin);
								}}
							>
								{renderPin(pin)}
							</div>
						) : (
							<div
								key={index}
								className={`tridi-dot ${styles['tridi-dot']}`}
								style={getPosition(pin)}
								onDoubleClick={(e) => {
									e.stopPropagation();
									onPinDoubleClick(pin);
								}}
								onClick={(e) => {
									e.stopPropagation();
									onPinClick(pin);
								}}
							/>
						)
					)}
		</div>
	);
};

Pins.defaultProps = {
	pins: [],
	pinWidth: 10,
	pinHeight: 10,
	onDoubleClick: () => {},
	onPinClick: () => {}
};

export default Pins;
