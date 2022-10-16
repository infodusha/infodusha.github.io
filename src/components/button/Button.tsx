import css from './button.module.css';
import {cn} from '@helpers/class-name';

type ButtonProps = {
	children: string;
	onClick?: () => void;
	renderPrefix?: () => JSX.Element;
	view: 'primary' | 'secondary';
	type?: 'button' | 'submit' | 'reset';
};

export function Button({children, onClick, view, type, renderPrefix}: ButtonProps) {
	const className = cn(css.button, {
		[css.buttonPrimary]: view === 'primary',
		[css.buttonSecondary]: view === 'secondary',
	});

	return (
		<button type={type} className={className} onClick={onClick}>
			{renderPrefix ? renderPrefix() : null}
			{children}
		</button>
	);
}
