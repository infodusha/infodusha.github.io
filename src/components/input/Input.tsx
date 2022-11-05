import type {ChangeEvent} from 'react';
import css from './input.module.css';

type InputProps = {
	label?: string;
	value: string;
	type?: 'text' | 'password' | 'email';
	onChange: (value: string) => void;
	autoComplete?: string;
};

export function Input({value, onChange, label, type = 'text', autoComplete}: InputProps) {
	function handleChange(event: ChangeEvent<HTMLInputElement>): void {
		onChange(event.target.value);
	}

	const input = (
		<input
			type={type}
			className={css.input}
			value={value}
			onChange={handleChange}
			autoComplete={autoComplete}
		/>
	);

	if (label) {
		return (
			<label className={css.label}>
				{label}
				{input}
			</label>
		);
	}

	return input;
}
