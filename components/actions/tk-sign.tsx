'use client';

export const TkSign = ({
	position = 'left',
	value,
}: {
	position?: 'left' | 'right';
	value: number | string;
}) => {
	let sign = 'Tk';
	return (
		<span>
			{position === 'left' ? sign : ''} {value}{' '}
			{position === 'right' ? sign : ''}
		</span>
	);
};
