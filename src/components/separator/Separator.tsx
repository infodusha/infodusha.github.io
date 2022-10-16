import css from './separator.module.css';
import {cn} from '@helpers/class-name';

type SeparatorProps = {
	className?: string;
	children: string;
};

export function Separator(props: SeparatorProps) {
	const className = cn(props.className, css.separator);

	return (
		<div className={className}>{props.children}</div>
	);
}
