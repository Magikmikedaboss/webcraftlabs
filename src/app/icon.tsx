import { ImageResponse } from 'next/og';

export const size = {
	width: 32,
	height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 20,
					background: 'linear-gradient(135deg, var(--primary, #2563eb) 0%, var(--accent, #0ea5e4) 100%)',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'var(--surface, #fff)',
					fontWeight: 'bold',
					borderRadius: '6px',
				}}
			>
				WL
			</div>
		),
		{ ...size }
	);
}
