import type {ChangeEvent, MouseEvent} from 'react';
import css from './checkbox.module.css';

type CheckboxProps = {
	children: string;
	value: boolean;
	onChange: (value: boolean) => void;
};

export function Checkbox({value, onChange, children}: CheckboxProps) {
	function handleChange(event: ChangeEvent<HTMLInputElement>): void {
		onChange(event.target.checked);
	}
  
	function handleMouseDown(event: MouseEvent<HTMLLabelElement>) {
		if (event.detail > 1) {
			event.preventDefault();
		}
	}

	return (
		<label className={css.checkbox} onMouseDown={handleMouseDown}>
			<input type="checkbox" checked={value} className={css.input} onChange={handleChange} />
			{children}
		</label>
	);

}
